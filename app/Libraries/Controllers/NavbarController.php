<?php
/**
 * @author guster
 */

namespace App\Libraries\Controllers;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Libraries\Plugins\Extend;
use App\Libraries\Plugins\Collects\PluginClassInformation;
use App\Libraries\Plugins\Collects\PluginCollect;
use App\Libraries\Plugins\Interfaces\Bootstrap\NavbarItem;
use App\Libraries\Plugins\Interfaces\Bootstrap\NavbarIcon;
use App\Libraries\Plugins\Interfaces\Bootstrap\NavbarPosition;
use App\Libraries\Plugins\Interfaces\Bootstrap\NavbarModule;

class NavbarController extends BaseController
{
	protected const PLUGIN_NAME = NavbarModule::class;

	protected $orgModules;
	protected $modules;
	protected $navbarLeft;
	protected $navbarDefault;
	protected $navbarRight;

	private function getModules()
	{
		if(isset($this->orgModules))
		{
			unset($this->orgModules);
		}
		if(isset($this->modules))
		{
			unset($this->modules);
		}
		if(isset($this->navbarLeft))
		{
			unset($this->navbarLeft);
		}
		if(isset($this->navbarDefault))
		{
			unset($this->navbarDefault);
		}
		if(isset($this->navbarRight))
		{
			unset($this->navbarRight);
		}

		$collect = new PluginCollect(Extend::$CONTROLLER_PLUGIN_PATH, NavbarController::PLUGIN_NAME);
		$this->orgModules = $collect->getModules();
		$this->modules = array();
		$this->navbarLeft = array();
		$this->navbarDefault = array();
		$this->navbarRight = array();

		foreach($this->orgModules as $module)
		{
			if($module->getFunctionCanShow())
			{
				array_push($this->modules, $module);
				switch($module->getFunctionPosition())
				{
					case NavbarPosition::POSITION_LEFT:
						array_push($this->navbarLeft, $module);
						break;
					case NavbarPosition::POSITION_DEFAULT:
						array_push($this->navbarDefault, $module);
						break;
					case NavbarPosition::POSITION_RIGHT:
						array_push($this->navbarRight, $module);
						break;
				}
			}
		}
		unset($collect);
	}
	
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
		$this->getModules();
    }

	public function __destruct()
	{
		if(isset($this->orgModules))
		{
			unset($this->orgModules);
		}
		if(isset($this->modules))
		{
			unset($this->modules);
		}
		if(isset($this->navbarLeft))
		{
			unset($this->navbarLeft);
		}
		if(isset($this->navbarDefault))
		{
			unset($this->navbarDefault);
		}
		if(isset($this->navbarRight))
		{
			unset($this->navbarRight);
		}
	}

	private function moduleNavbarItem(NavbarItem $navbarItem)
	{
		$url = previous_url(true);
		$json = [
			'isImage' => $navbarItem->isImage,
			'image' => $navbarItem->image,
			'imageName' => $navbarItem->imageName,
			'css' => $navbarItem->css,
			'name' => $navbarItem->name,
			'href' => $navbarItem->path,
			'badgeNumber' => $navbarItem->badgeNumber,
			'isDivider' => $navbarItem->isDivider,
		];
		$json['isAction'] = $navbarItem->path === $url->getPath();
		return $json;
	}
	private function moduleNavbarIcon(NavbarIcon $navbarIcon)
	{
		$json = [
			'isImage' => $navbarIcon->isImage,
			'image' => $navbarIcon->image,
			'css' => $navbarIcon->css,
			'isDivider' => $navbarIcon->isDivider,
			'subMenu' => [],
		];
		if($navbarIcon->subMenu)
		{
			foreach($navbarIcon->subMenu as $navbarItem)
			{
				array_push($json['subMenu'], $this->moduleNavbarItem($navbarItem));
			}
		}
		return $json;
	}
	private function module(NavbarModule $module)
	{
		$url = previous_url(true);
		$json = [
			'number' => $module->getFunctionNumber(),
			'name' => $module->getFunctionName(),
			'navbarIcon' => $this->moduleNavbarIcon($module->getFunctionNabars()),
			'badgeNumber' => $module->getFunctionBadgeNumber(),
			'href' => $module->getFunctionPath(),
		];
		$json['isAction'] = $module->getFunctionPath() === $url->getPath() || 
							count(array_filter($json['navbarIcon']['subMenu'], 
												function($value) {
													return $value['isAction'] === true;
												})) > 0;
		return $json;
	}
	public function Modules()
	{
		$modules = [
			'left' => [],
			'default' => [],
			'right' => [],
		];
		if($this->navbarLeft)
		{
			foreach($this->navbarLeft as $module)
			{
				array_push($modules['left'], $this->module($module));
			}
		}
		if($this->navbarDefault)
		{
			foreach($this->navbarDefault as $module)
			{
				array_push($modules['default'], $this->module($module));
			}
		}
		if($this->navbarRight)
		{
			foreach($this->navbarRight as $module)
			{
				array_push($modules['right'], $this->module($module));
			}
		}
        return $this->response->setJSON($modules);
	}
}