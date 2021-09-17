<?php

namespace App\Libraries\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;
use Psr\Log\LoggerInterface;
use App\Libraries\Plugins\Extend;

abstract class BaseController extends Controller
{
    /**
	 * Constructor.
	 *
	 * @param RequestInterface  $request
	 * @param ResponseInterface $response
	 * @param LoggerInterface   $logger
	 */
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
		parent::initController($request, $response, $logger);
        
        $language = Services::response()->getCookie(Extend::$LANGUAGE_KEY);
        if(!$this->isEmpty($language))
        {
            $language = Extend::$DEFAULT_LANGUAGE;
        }
        $this->changeLanguage($language);
    }

    /**
     * check string is empty
     * @param string $value
     * @return bool
     */
    protected function isEmpty($value)
    {
        $ret = true;
        if($value instanceof string)        
        {
            $ret = !isset($value) && !is_null($value) && !empty($value);
        }
        else
        {
            $ret = false;
        }
        return $ret;
    }

    /**
     * change language
     * @param string $language
     */
    protected function changeLanguage(string $language)
    {
        Services::response()->setCookie(Extend::$LANGUAGE_KEY, $language);
        Services::language()->setLocale($language);
    }
}