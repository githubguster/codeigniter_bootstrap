<?php
/**
 * @author guster
 */

namespace App\Libraries\Plugins\Interfaces\Bootstrap;

class NavbarIcon
{
    private $isImage;
    private $image;
    private $imageName;
    private $css;
    private $isDivider;
    private $subMenu;

    /**
     * @param bool $isImage
     * @param string $image
     * @param string $imageName
     * @param string $css
     * @param bool $isDivider
     * @param NavbarItem array $subMenu
     */
    public function __construct(bool $isImage, ?string $image, ?string $imageName, ?string $css, bool $isDivider, ?array $subMenu)
    {
        $this->isImage = $isImage;
        $this->image = $image;
        $this->imageName = $imageName;
        $this->css = $css;
        $this->isDivider = $isDivider;
        $this->subMenu = $subMenu;
    }

    public function __destruct()
    {
        if(isset($this->isImage))
        {
            unset($this->isImage);
        }
        if(isset($this->image))
        {
            unset($this->image);
        }
        if(isset($this->imageName))
        {
            unset($this->imageName);
        }
        if(isset($this->css))
        {
            unset($this->css);
        }
        if(isset($this->isDivider))
        {
            unset($this->isDivider);
        }
        if(isset($this->subMenu))
        {
            unset($this->subMenu);
        }
    }

    public function __get($name)
    {
        return $this->$name;
    }
}