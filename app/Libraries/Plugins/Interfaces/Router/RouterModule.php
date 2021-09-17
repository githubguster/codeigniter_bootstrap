<?php
/**
 * @author guster
 */

namespace App\Libraries\Plugins\Interfaces\Router;

interface RouterModule
{
    /**
     * get router information
     * @return RouterInformation array
     */
    public function getRouterInformations();
}