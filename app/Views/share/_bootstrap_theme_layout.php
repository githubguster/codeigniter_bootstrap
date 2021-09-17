<?php
    /**
     * @author guster
     * @param section: meta, title,headCss, headJavaScript, body, bodyJavaScript
     */
    helper('Extension/html_extension');
?>

<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="pragma" content="no-cache">
		<meta name="viewport" content="width=device-width, initial-scale=1">
        <?= $this->renderSection('meta'); ?>
        <title><?= $this->renderSection('title'); ?></title>

        <?= link_version_tag('/dist/css/components_public_library.min.css'); ?>
        <?= $this->renderSection('headCss'); ?>

        <?= script_version_tag('/dist/js/components_public_library.min.js'); ?>
        <?= $this->renderSection('headJavaScript'); ?>
    </head>
    <body>
        <?= $this->renderSection('body') ?>
        <?= $this->renderSection('bodyJavaScript') ?>
    </body>
</html>