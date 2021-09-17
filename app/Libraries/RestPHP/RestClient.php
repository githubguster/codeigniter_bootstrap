<?php

namespace App\Libraries\RestPHP;

class RestClient
{
    public const VERSION = '0.0.1';
    protected const DEFAULT_OPTIONS = [
        'headers' => [],
        'parameters' => [],
        'curl_options' => [],
        'build_indexed_queries' => FALSE,
        'conection_timeout_ms' => 5000,
        'timeout_ms' => 5000,
        'user_agent' => 'RestPHP Client/' . RestClient::VERSION,
        'base_url' => NULL,
        'proxy_host' => NULL,
        'proxy_port' => NULL,
        'request_format' => NULL,
        'response_format' => NULL,
        'encoders' => [
            'json' => 'json_encode',
        ],
        'decoders' => [
            'json' => 'json_decode',
        ],
        'username' => NULL,
        'password' => NULL,
    ];

    public $options;
    public $url;
    public $handle;
    public $response_headers;
    public $response_status_lines;
    public $response_raw;
    public $response;

    private function parse_response($response, $headers = [])
    {
        $this->response_status_lines = [];
        $this->response_headers = $headers;
        if(is_array($headers) && count($headers) > 0)
        {
            foreach($headers as $key => $value)
            {
                if(strpos($value, 'HTTP') === 0)
                {
                    array_push($this->response_status_lines, trim($value));
                }
                else
                {
                    list($_key, $_value) = explode(':', $value, 2);
                    $_key = trim(strtolower(str_replace('-', '_', $_key)));
                    $_value = trim($_value);

                    if(empty($this->response_headers[$_key]))
                    {
                        $this->response_headers[$_key] = $_value;
                    }
                    else if (is_array($this->response_headers[$_key]))
                    {
                        array_push($this->response_headers[$_key], $_value);
                    }
                    else
                    {
                        $this->response_headers[$_key] = [$this->response_headers[$_key], $_value];
                    }
                }
            }

            $this->response_raw = $response;
        }
        else
        {
            $lines = explode("\n", $response);
            
            foreach($lines as $key => $value)
            {
                if(strlen(trim($value)) == 0)
                {
                    if(count($this->response_headers) > 0)
                    {
                        $this->response_raw = implode(array_slice($lines, $key, NULL, true));
                        break;
                    }
                }
                else if(strpos($value, 'HTTP') === 0)
                {
                    array_push($this->response_status_lines, trim($value));
                }
                else
                {
                    list($_key, $_value) = explode(':', $value, 2);
                    $_key = trim(strtolower(str_replace('-', '_', $_key)));
                    $_value = trim($_value);

                    if(empty($this->response_headers[$_key]))
                    {
                        $this->response_headers[$_key] = $_value;
                    }
                    else if (is_array($this->response_headers[$_key]))
                    {
                        array_push($this->response_headers[$_key], $_value);
                    }
                    else
                    {
                        $this->response_headers[$_key] = [$this->response_headers[$_key], $_value];
                    }
                }
            }
        }

        if($this->response_raw)
        {
            if ($this->options['response_format'] && $this->options['decoders'][$this->options['response_format']])
            {
                $this->response = call_user_func($this->options['decoders'][$this->options['response_format']], $this->response_raw);
            }
            else
            {
                $this->response = (string)$this->response_raw;
            }
        }
    }

    private function execute_with_curl($url, $method, $parameters = [], $headers = [])
    {
        $client = clone $this;
        $client->url = $url;
        $client->handle = curl_init();
        $curlopt = [
            CURLOPT_HEADER => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_USERAGENT => $client->options['user_agent'],
            CURLOPT_CONNECTTIMEOUT_MS => intval($client->options['conection_timeout_ms'], 10),
            CURLOPT_TIMEOUT_MS => intval($client->options['timeout_ms'], 10),
        ];

        if($client->options['username'] && $client->options['password'])
        {
            $curlopt[CURLOPT_USERPWD] = sprintf("%s:%s", $client->options['username'], $client->options['password']);
        }

        if((is_array($client->options['headers']) && count($client->options['headers'])) || (is_array($headers) && count($headers)))
        {
            $headers = array_merge(is_array($client->options['headers']) ? $client->options['headers'] : [$client->options['headers']], is_array($headers) ? $headers : [$headers]);
            $client->set_options('headers', $headers);
            $curlopt[CURLOPT_HTTPHEADER] = [];
            foreach($headers as $key => $values)
            {
                foreach((is_array($values) ? $values : [$values]) as $value)
                {
                    array_push($curlopt[CURLOPT_HTTPHEADER], sprintf("%s:%s", $key, $value));
                }
            }
        }

        if($client->options['proxy_host'] && $client->options['proxy_port'])
        {
            array_push($curlopt, CURLOPT_PROXY, $client->options['proxy_host']);
            array_push($curlopt, CURLOPT_PROXYPORT, intval($client->options['proxy_port'], 10));
        }

        if(is_array($parameters))
        {
            $parameters = array_merge(is_array($client->options['parameters']) ? $client->options['parameters'] : [$client->options['parameters']], is_array($parameters) ? $parameters : [$parameters]);
            $client->set_options('parameters', $parameters);

            $parameters_string = http_build_query($parameters);
            if(!$client->options['build_indexed_queries'])
            {
                $parameters_string = preg_replace("/%5B[0-9]+%5D=/simU", "%5B%5D=", $parameters_string);
            }
        }
        else if ($client->options['request_format'] && $client->options['encoders'][$client->options['request_format']])
        {
            $parameters_string = call_user_func($client->options['encoders'][$client->options['request_format']], $parameters);
        }
        else
        {
            $parameters_string = (string)$parameters;
        }

        if(strtoupper($method) === 'POST')
        {
            $curlopt[CURLOPT_POST] = TRUE;
            $curlopt[CURLOPT_POSTFIELDS] = $parameters_string;
        }
        else if(strtoupper($method) !== 'GET')
        {
            $curlopt[CURLOPT_CUSTOMREQUEST] = strtoupper($method);
            $curlopt[CURLOPT_POSTFIELDS] = $parameters_string;
        }
        else if($parameters_string)
        {
            $client->url .= strpos($client->url, '?') ? '&' : '?';
            $client->url .= $parameters_string;
        }

        if($client->options['base_url'])
        {
            if($client->url[0] !== '/' && substr($client->options['base_url'], -1) !== '/')
            {
                $client->url = '/' . $client->url;
            }
            $client->url = $client->options['base_url'] . $client->url;
        }
        $curlopt[CURLOPT_URL] = $client->url;

        if($client->options['curl_options'])
        {
            foreach($client->options['curl_options'] as $key => $value)
            {
                $curlopt[$key] = $value;
            }
        }
        curl_setopt_array($client->handle, $curlopt);

        $client->parse_response(curl_exec($client->handle), NULL);

        curl_close($client->handle);
        return $client;
    }

    private function execute_with_file($url, $method, $parameters = [], $headers = [])
    {
        $client = clone $this;
        $client->url = $url;

        $opts = [
            'method' => strtoupper($method),
            'user_agent' => $client->options['user_agent'],
            'timeout' => intval($client->options['timeout_ms'] / 1000, 10),
            'ignore_errors' => TRUE,
        ];

        if($client->options['username'] && $client->options['password'])
        {
            $client->headers['Authorization'] = 'Basic ' . base64_encode(sprintf("%s:%s", $client->options['username'], $client->options['password']));
        }
        
        if((is_array($client->options['headers']) && count($client->options['headers'])) || (is_array($headers) && count($headers)))
        {
            $headers = array_merge(is_array($client->options['headers']) ? $client->options['headers'] : [$client->options['headers']], is_array($headers) ? $headers : [$headers]);
            $client->set_options('headers', $headers);
            foreach($headers as $key => $values)
            {
                foreach((is_array($values) ? $values : [$values]) as $value)
                {
                    $client->headers[$key] = $value;
                }
            }

            $opts['header'] = implode("\r\n", $client->headers);
        }

        if($client->options['proxy_host'] && $client->options['proxy_port'])
        {
            $opts['proxy'] = sprintf("%s:%s", $client->options['proxy_host'], $client->options['proxy_port']);
        }

        if(is_array($parameters))
        {
            $parameters = array_merge(is_array($client->options['parameters']) ? $client->options['parameters'] : [$client->options['parameters']], is_array($parameters) ? $parameters : [$parameters]);
            $client->set_options('parameters', $parameters);

            $parameters_string = http_build_query($parameters);
            if(!$client->options['build_indexed_queries'])
            {
                $parameters_string = preg_replace("/%5B[0-9]+%5D=/simU", "%5B%5D=", $parameters_string);
            }
        }
        else if ($client->options['request_format'] && $client->options['encoders'][$client->options['request_format']])
        {
            $parameters_string = call_user_func($client->options['encoders'][$client->options['request_format']], $parameters);
        }
        else
        {
            $parameters_string = (string)$parameters;
        }

        if(strtoupper($method) !== 'GET')
        {
            $opts['content'] = $parameters_string;
        }
        else if($parameters_string)
        {
            $client->url .= strpos($client->url, '?') ? '&' : '?';
            $client->url .= $parameters_string;
        }

        if($client->options['base_url'])
        {
            if($client->url[0] !== '/' && substr($client->options['base_url'], -1) !== '/')
            {
                $client->url = '/' . $client->url;
            }
            $client->url = $client->options['base_url'] . $client->url;
        }

        $client->handle = stream_context_create(['http' => $opts]);
        $response = file_get_contents($client->url, false, $client->handle);
        $client->parse_response($response, $http_response_header);

        return $client;
    }

    private function execute($url, $method, $parameters = [], $headers = [])
    {
        if(function_exists('curl_version'))
        {
            return $this->execute_with_curl($url, $method, $parameters, $headers);
        }
        else
        {
            return $this->execute_with_file($url, $method, $parameters, $headers);
        }
    }

    public function __construct($options = [])
    {
        $this->options = array_merge(RestClient::DEFAULT_OPTIONS, $options);
        if(array_key_exists('encoders', $options))
        {
            $this->set_options('encoders', $options['encoders']);
        }
        if(array_key_exists('decoders', $options))
        {
            $this->set_options('decoders', $options['decoders']);
        }
    }

    public function __destruct()
    {
        if(isset($this->url))
        {
            unset($this->url);
        }
        if(isset($this->handle))
        {
            unset($this->handle);
        }
        if(isset($this->options))
        {
            unset($this->options);
        }
        if(isset($this->response_headers))
        {
            unset($this->response_headers);
        }
        if(isset($this->response_status_lines))
        {
            unset($this->response_status_lines);
        }
        if(isset($this->response_raw))
        {
            unset($this->response_raw);
        }
        if(isset($this->response))
        {
            unset($this->response);
        }
    }

    public function set_options($key, $value)
    {
        if($key === 'encoders' || $key === 'decoders')
        {
            $this->options[$key] = array_merge(RestClient::DEFAULT_OPTIONS[$key], is_array($value) ? $value : [$value]);
        }
        else
        {
            if(is_array(RestClient::DEFAULT_OPTIONS[$key]))
            {
                array_push($this->options[$key], $value);
            }
            else
            {
                $this->options[$key] = $value;
            }
        }
    }

    public function register_encoder($format, $method)
    {
        $this->options['encoders'][$format] = $method;
    }

    public function register_decoder($format, $method)
    {
        $this->options['decoders'][$format] = $method;
    }

    public function get($url, $parameters = [], $headers = [])
    {
        return $this->execute($url, 'GET', $parameters, $headers);
    }

    public function POST($url, $parameters = [], $headers = [])
    {
        return $this->execute($url, 'POST', $parameters, $headers);
    }

    public function put($url, $parameters = [], $headers = [])
    {
        return $this->execute($url, 'PUT', $parameters, $headers);
    }

    public function patch($url, $parameters = [], $headers = [])
    {
        return $this->execute($url, 'PATCH', $parameters, $headers);
    }

    public function delete($url, $parameters = [], $headers = [])
    {
        return $this->execute($url, 'DELETE', $parameters, $headers);
    }

    public function head($url, $parameters = [], $headers = [])
    {
        return $this->execute($url, 'HEAD', $parameters, $headers);
    }
}