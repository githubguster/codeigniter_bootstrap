<?php

namespace App\Libraries\Plugin\Router;

use App\Libraries\Plugins\Interfaces\Router\RouterModule;
use App\Libraries\Plugins\Interfaces\Router\RouterInformaiton;
use App\Libraries\Plugins\Interfaces\Router\RouterMethod;
use App\Controllers\CentralWeatherBureau as Controller;

class CentralWeatherBureau implements RouterModule
{
    /**
     * get router information
     * @return RouterInformation array
     */
    public function getRouterInformations()
    {
        $informations = array();

        array_push($informations, new RouterInformaiton(Controller::INDEX_PAGE, Controller::INDEX_PAGE_FUNCTION . Controller::INDEX_PAGE_PARAMETER, RouterMethod::GET));
        array_push($informations, new RouterInformaiton(Controller::WEATHER_PAGE, Controller::WEATHER_PAGE_FUNCTION . Controller::WEATHER_PAGE_PARAMETER, RouterMethod::GET));

        return $informations;
    }
}