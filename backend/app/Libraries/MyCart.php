<?php

namespace App\Libraries;

class MyCart
{
    public static function checkId($carts, $product_id)
    {
        $check = -1;
        if (count($carts) > 0) {
            foreach ($carts as $pos => $item) {
                if ($item['id'] == $product_id) {
                    $check = $pos;
                    break;
                }
            }
        }
        return $check;
    }
    public static function addCart($name, $cart_item)
    {
        $carts = [];
        if (session()->has($name)) {
            $carts = session()->get($name);
        }
        if (count($carts) > 0) {
            $product_id = $cart_item['id'];
            $pos = self::checkId($carts, $product_id);
            if ($pos == -1) {
                $carts[] = $cart_item;
            } else {
                $carts[$pos]['qty']++;
            }
        } else {
            $carts[] = $cart_item;
        }
        session([$name => $carts]);
    }
    public static function updateCart($name, $id, $qty)
    {
        $carts = [];
        if (session()->has($name)) {
            $carts = session()->get($name);
        }
        $pos = self::checkId($carts, $id);
        if ($pos != -1) {
            if ($qty == 0) {
                unset($carts[$pos]);
            } else {
                $carts[$pos]['qty'] = $qty;
            }
        }
        session([$name => $carts]);
    }
    public static function removeCart($name, $id)
    {
        $carts = [];
        if (session()->has($name)) {
            $carts = session()->get($name);
        }
        $pos = self::checkId($carts, $id);
        if ($pos != -1) {
            unset($carts[$pos]);
        }
        session([$name => $carts]);
    }
    public static function getTotalPrice($name)
    {
        $carts = [];
        if (session()->has($name)) {
            $carts = session()->get($name);
        }
        $total_price = 0;
        foreach ($carts as $item) {
            $total_price += $item['price'] * $item['qty'];
        }
        return $total_price;
    }
    public static function getContent($name)
    {
        return session($name, []);
    }

}