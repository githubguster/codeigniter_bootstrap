<?php
/**
 * @author guster
 */

namespace App\Libraries\Plugins\Interfaces\Router;

use CodeIgniter\Router\RouteCollection;
use App\Libraries\Plugins\Extend;
use App\Libraries\Plugins\Collects\PluginClassInformation;
use App\Libraries\Plugins\Collects\PluginCollect;
use App\Libraries\Plugins\Interfaces\Router\RouterModule;

class RouterCollect
{
    protected const PLUGIN_NAME = RouterModule::class;
    protected $modules;

    private function getModules()
    {
        if(isset($this->modules))
        {
            unset($this->modules);
        }
        
		$collect = new PluginCollect(Extend::$ROUTER_PLUGIN_PATH, RouterCollect::PLUGIN_NAME);
        $this->modules = $collect->getModules();
        unset($collect);
    }

    public function __construct()
    {
        $this->getModules();
    }

    public function __destruct()
    {
        if(isset($this->modules))
        {
            unset($this->modules);
        }
    }

    public function setRuoter(RouteCollection $router)
    {
        if(isset($router))
        {
            foreach($this->modules as $module)
            {
                $informations = $module->getRouterInformations();

                if(isset($informations) && is_array($informations))
                {
                    foreach($informations as $information)
                    {
                        switch($information->method)
                        {
                            case RouterMethod::GET:
                                $router->get($information->url, $information->function);
                                break;
                            case RouterMethod::POST:
                                $router->post($information->url, $information->function);
                                break;
                            case RouterMethod::PUT:
                                $router->put($information->url, $information->function);
                                break;
                            case RouterMethod::DELETE:
                                $router->delete($information->url, $information->function);
                                break;
                            case RouterMethod::PATCH:
                                $router->patch($information->url, $information->function);
                                break;
                        }
                    }
                }
            }
        }
    }
}