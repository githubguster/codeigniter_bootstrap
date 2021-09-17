<?php
/**
 * @author guster
 */

namespace App\Libraries\Plugins\Interfaces\Router;

class RouterInformaiton
{
    private $url;
    private $function;
    private $method;

    /**
     * @param string $url
     * @param string $function
     * @param string $metod
     */
    public function __construct(string $url, string $function, int $method)
    {
        $this->url = $url;
        $this->function = $function;
        $this->method = $method;
    }

    public function __destruct()
    {
		if(isset($this->url))
		{
			unset($this->url);
		}
		if(isset($this->function))
		{
			unset($this->function);
		}
		if(isset($this->method))
		{
			unset($this->method);
		}
    }

    public function __get($name)
    {
        return $this->$name;
    }
}