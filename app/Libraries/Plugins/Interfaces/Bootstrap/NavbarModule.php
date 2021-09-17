<?php
/**
 * @author guster
 */

namespace App\Libraries\Plugins\Interfaces\Bootstrap;

interface NavbarModule
{
    /**
     * get function number
     * @return number
     */
    public function getFunctionNumber();
    /**
     * get function name
     * @return string
     */
    public function getFunctionName();
    /**
     * get function version
     * @return float
     */
    public function getFunctionVersion();
    /**
     * get function path
     * @return name
     */
    public function getFunctionPath();
    /**
     * get function can show
     * @return bool
     */
    public function getFunctionCanShow();
    /**
     * get function navbars
     * @return NavbarIcon
     */
    public function getFunctionNabars();
    /**
     * get function navbars position
     * @return NavbarPosition
     */
    public function getFunctionPosition();
    /**
     * get function badge number
     * @return number
     */
    public function getFunctionBadgeNumber();
}