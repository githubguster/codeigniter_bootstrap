<?php
namespace App\Libraries\Plugin\Controller;

use App\Libraries\Plugins\Interfaces\Bootstrap\NavbarModule as BootstrapNavBarModule;
use App\Libraries\Plugins\Interfaces\Bootstrap\NavbarItem as BootstrapNavBarItem;
use App\Libraries\Plugins\Interfaces\Bootstrap\NavbarIcon as BootstrapNavBarIcon;
use App\Libraries\Plugins\Interfaces\Bootstrap\NavbarPosition as BootstrapNavbarPosition;
use App\Controllers\CentralWeatherBureau as Controller;

class CentralWeatherBureau implements BootstrapNavBarModule
{
    private $functionNumber;
    private $functionName;
    private $functionVersion;
    private $functionNavbarIcon;
    private $functionBadgeNumber;
    private $functionContextPath;
    private $functionPosition;
    private $functionIsCanShow;

    public function __construct()
    {
        $this->functionNumber = 1;
        $this->functionName = 'CentralWeatherBureau.title';
        $this->functionVersion = '1.0.0';
        $this->functionNavbarIcon = new BootstrapNavBarIcon(FALSE, NULL, NULL, NULL, FALSE, NULL);
        $this->functionBadgeNumber = 0;
        $this->functionContextPath = Controller::INDEX_PAGE;
        $this->functionPosition = BootstrapNavbarPosition::POSITION_DEFAULT;
        $this->functionIsCanShow = TRUE;
    }

    public function __destruct()
    {
        if(isset($this->functionNumber))
        {
            unset($this->functionNumber);
        }
        if(isset($this->functionName))
        {
            unset($this->functionName);
        }
        if(isset($this->functionVersion))
        {
            unset($this->functionVersion);
        }
        if(isset($this->functionNavbarIcon))
        {
            unset($this->functionNavbarIcon);
        }
        if(isset($this->functionBadgeNumber))
        {
            unset($this->functionBadgeNumber);
        }
        if(isset($this->functionContextPath))
        {
            unset($this->functionContextPath);
        }
        if(isset($this->functionPosition))
        {
            unset($this->functionPosition);
        }
        if(isset($this->functionIsCanShow))
        {
            unset($this->functionIsCanShow);
        }
    }

    /**
     * get function number
     * @return number
     */
    public function getFunctionNumber()
    {
        return $this->functionNumber;
    }
    /**
     * get function name
     * @return string
     */
    public function getFunctionName()
    {
        return lang($this->functionName);
    }
    /**
     * get function version
     * @return float
     */
    public function getFunctionVersion()
    {
        return $this->functionVersion;
    }
    /**
     * get function path
     * @return name
     */
    public function getFunctionPath()
    {
        return $this->functionContextPath;
    }
    /**
     * get function can show
     * @return bool
     */
    public function getFunctionCanShow()
    {
        return $this->functionIsCanShow;
    }
    /**
     * get function navbars
     * @return NavbarItem
     */
    public function getFunctionNabars()
    {
        return $this->functionNavbarIcon;
    }
    /**
     * get function navbars position
     * @return NavbarPosition
     */
    public function getFunctionPosition()
    {
        return $this->functionPosition;
    }
    /**
     * get function badge number
     * @return number
     */
    public function getFunctionBadgeNumber()
    {
        return $this->functionBadgeNumber;
    }
}