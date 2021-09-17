<?php
/**
 * @author guster
 */

namespace App\Libraries\Plugins\Interfaces\Bootstrap;

class NavbarItem
{
    private $isImage;
    private $image;
    private $imageName;
    private $css;
    private $path;
    private $name;
    private $badgeNumber;
    private $isDivider;

    /**
     * @param bool $isImage
     * @param string $image
     * @param string $imageName
     * @param string $css
     * @param string $path
     * @param string $name
     * @param int $badgeNumber
     * @param bool $isDivider
     */
    public function __construct(bool $isImage, ?string $image, ?string $imageName, ?string $css, ?string $path, ?string $name, int $badgeNumber, bool $isDivider)
    {
        $this->isImage = $isImage;
        $this->image = $image;
        $this->imageName = $imageName;
        $this->css = $css;
        $this->path = $path;
        $this->name = $name;
        $this->badgeNumber = $badgeNumber;
        $this->isDivider = $isDivider;
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
        if(isset($this->path))
        {
            unset($this->path);
        }
        if(isset($this->name))
        {
            unset($this->name);
        }
        if(isset($this->badgeNumber))
        {
            unset($this->badgeNumber);
        }
        if(isset($this->isDivider))
        {
            unset($this->isDivider);
        }
    }

    public function __get($name)
    {
        return $this->$name;
    }
}