<?php

namespace App\Controllers;

use App\Libraries\Controllers\NavbarController as BootstrapNavbarController;
use App\Libraries\RestPHP\RestClient as RestClient;

class CentralWeatherBureau extends BootstrapNavbarController
{
    public const CONTROLLER = 'CentralWeatherBureau';
	public const INDEX = 'Index';
	public const INDEX_PAGE = '/';
	public const INDEX_PAGE_FUNCTION = CentralWeatherBureau::CONTROLLER . '::' . CentralWeatherBureau::INDEX;
	public const INDEX_PAGE_PARAMETER = '';
    public const WEATHER = 'Weather';
    public const WEATHER_PAGE = '/' . CentralWeatherBureau::CONTROLLER . '/' . CentralWeatherBureau::WEATHER;
    public const WEATHER_PAGE_FUNCTION = CentralWeatherBureau::CONTROLLER . '::' . CentralWeatherBureau::WEATHER;
    public const WEATHER_PAGE_PARAMETER = '';

	public function Index()
	{
		return view('central_weather_bureau');
	}

	public function Weather()
	{
		$client = new RestClient(['response_format' => 'json']);

		$result = $client->get('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0001-001',
								['Authorization' => 'rdec-key-123-45678-011121314',
								 'format' => 'JSON',]);
		$locations = $result->response->cwbopendata->location;
		usort($locations, function($value1, $value2)
		{
			$city1 = array_values(array_filter($value1->parameter, function($value) 
			{
				return $value->parameterName === "CITY_SN";
			}));
			$town1 = array_values(array_filter($value1->parameter, function($value) 
			{
				return $value->parameterName === "TOWN_SN";
			}));
			$city2 = array_values(array_filter($value2->parameter, function($value) 
			{
				return $value->parameterName === "CITY_SN";
			}));
			$town2 = array_values(array_filter($value2->parameter, function($value) 
			{
				return $value->parameterName === "TOWN_SN";
			}));

			if(count($city1) == 1 && count($town1) == 1 && count($city2) == 1 && count($town2) == 1)
			{
				if($city1[0]->parameterValue == $city2[0]->parameterValue)
				{
					if($town1[0]->parameterValue == $town2[0]->parameterValue)
					{
						return 0;
					}
					else if($town1[0]->parameterValue > $town2[0]->parameterValue)
					{
						return 1;
					}
					else
					{
						return -1;
					}
				}
				else if($city1[0]->parameterValue > $city2[0]->parameterValue)
				{
					return 1;
				}
				else
				{
					return -1;
				}
			}
			return 0;
		});
        return $this->response->setJSON($locations);
	}
}
