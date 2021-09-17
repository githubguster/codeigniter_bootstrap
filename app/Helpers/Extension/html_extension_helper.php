<?php

if(!function_exists('link_version_tag'))
{
    function link_version_tag(string $href = '', string $rel = 'stylesheet', string $type = 'text/css', string $title = '', string $media = '', string $hreflang = ''): string
    {
        helper('html');
        if(!preg_match('#^([a-z]+:)?//#i', $href))
        {
            $filePath = FCPATH . $href;
            if(file_exists($filePath)) 
            {
                $fileInfo = pathinfo($filePath);
                if(strpos($fileInfo['dirname'], FCPATH) !== FALSE) 
                {
                    $href .= '?v=' . filemtime($filePath);
                }
                else 
                {
                    $href = '';
                }
            }
            else 
            {
                $href = '';
            }
        }
        $link = '';
        if($href !== '')
        {
            $link = link_tag($href, $rel, $type, $title, $media, FALSE, $hreflang);
            $link = str_replace(slash_item('baseURL'), '', $link);
        }
        return $link;
    }
}

if(!function_exists('script_version_tag'))
{
    function script_version_tag(string $src = '') : string
    {
        helper('html');
        if(!preg_match('#^([a-z]+:)?//#i', $src)) 
        {
            $filePath = FCPATH . $src;
            if(file_exists($filePath)) 
            {
                $fileInfo = pathinfo($filePath);
                if(strpos($fileInfo['dirname'], FCPATH) !== FALSE) 
                {
                    $src .= '?v=' . filemtime($filePath);
                }
                else 
                {
                    $src = '';
                }
            }
            else 
            {
                $src = '';
            }
        }
        $script = '';
        if($src !== '')
        {
            $script = script_tag($src, FALSE);
            $script = str_replace(slash_item('baseURL'), '', $script);
        }
        return $script;
    }
}