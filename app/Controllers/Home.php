<?php

namespace App\Controllers;

use App\Libraries\Controllers\NavbarController as BootstrapNavbarController;

class Home extends BootstrapNavbarController
{
    public const CONTROLLER = 'Home';
    public const INDEX = 'Index';
    public const INDEX_PAGE = '/' . Home::CONTROLLER . '/' . Home::INDEX;
    public const INDEX_PAGE_FUNCTION = Home::CONTROLLER . '::' . Home::INDEX;
    public const INDEX_PAGE_PARAMETER = '';
	public const MODULES = 'Modules';
    public const MODULES_PAGE = '/' . Home::CONTROLLER . '/' . Home::MODULES;
    public const MODULES_PAGE_FUNCTION = Home::CONTROLLER . '::' . Home::MODULES;
    public const MODULES_PAGE_PARAMETER = '';

	public function Index()
	{
		return view('welcome_message');
	}
}
