<?php
    /**
     * @author guster
     */
    helper('Extension/html_extension');
?>

<?= $this->extend('share/_bootstrap_theme_layout'); ?>

<?= $this->section('meta'); ?>
<?= $this->endSection(); ?>

<?= $this->section('title'); ?>
Weather
<?= $this->endSection(); ?>

<?= $this->section('headCss'); ?>
<?= link_version_tag('/dist/css/bootstrap_reactjs.min.css'); ?>
<?= $this->endSection(); ?>

<?= $this->section('headJavaScript'); ?>
<?= $this->endSection(); ?>

<?= $this->section('bodyJavaScript'); ?>
<?= script_version_tag('/dist/js/bootstrap_reactjs.min.js'); ?>
<?= $this->endSection(); ?>

<?= $this->section('body'); ?>
<div id="app" class="h-100"></div>
<?= $this->endSection(); ?>