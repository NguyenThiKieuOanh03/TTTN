<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use App\Models\Orderdetail;
use App\Models\ProductStore;
use App\Libraries\MyCart;

class ExportController extends Controller
{
    public function selectproduct(Request $request)
    {
        $id = $request->productid;
        $product = Product::where('product.id', $id)
            ->join('category', 'category.id', '=', 'product.category_id')
            ->join('brand', 'brand.id', '=', 'product.brand_id')
            ->select('product.id', 'product.price', 'product.name', 'product.image', 'category.name as
categoryname', 'brand.name as brandname')
            ->first();
        $cart_item = [
            'id' => $id,
            'name' => $product->name,
            'qty' => 1,
            'price' => $product->price,
            'image' => $product->image,
            'categoryname' => $product->categoryname,
            'brandname' => $product->brandname
        ];
        MyCart::addCart('carts', $cart_item);
        $listcat = MyCart::getContent('carts');
        $result = '';
        foreach ($listcat as $cart) {
            $amount = $cart['qty'] * $cart['price'];
            $result .= '<tr>';
            $result .= '<td>';
            $result .= '<img class="img-fluid" src="' . asset('storage/images/product/' . $cart["image"]) . '">';
            $result .= '</td>';
            $result .= '<td>' . $cart['name'] . '</td>';
            $result .= '<td>' . $cart['categoryname'] . '</td>';
            $result .= '<td>' . $cart['brandname'] . '</td>';
            $result .= '<td>' . $cart['price'] . '</td>';
            $result .= '<td><input onclick="changeqtycart(' . $cart['id'] . ')" id="product' . $cart['id'] . '" style="width:60px" name="qty[]" type="number" value="' . $cart['qty'] . '" min="0"></td>';
            $result .= '<td>' . $amount . '</td>';
            $result .= '<td class="text-center">';
            $result .= '<button type="button" class="btn btn-danger btn-xs px-2" onclick="deletecart(' . $cart['id'] . ')">X</button>';
            $result .= '</td>';
            $result .= '</tr>';
        }
        echo $result;
    }
    public function changeqtycart(Request $request)
    {
        $id = $request->id;
        $qty = $request->qty;
        MyCart::updateCart('carts', $id, $qty);
        $listcat = MyCart::getContent('carts');
        $result = '';
        foreach ($listcat as $cart) {
            $amount = $cart['qty'] * $cart['price'];
            $result .= '<tr>';
            $result .= '<td>';
            $result .= '<img class="img-fluid" src="' . asset('storage/images/product/' . $cart["image"]) . '">';
            $result .= '</td>';
            $result .= '<td>' . $cart['name'] . '</td>';
            $result .= '<td>' . $cart['categoryname'] . '</td>';
            $result .= '<td>' . $cart['brandname'] . '</td>';
            $result .= '<td>' . $cart['price'] . '</td>';
            $result .= '<td><input onclick="changeqtycart(' . $cart['id'] . ')" id="product' . $cart['id'] .
                '" style="width:60px" name="qty[]" type="number" value="' . $cart['qty'] . '" min="0"></td>';
            $result .= '<td>' . $amount . '</td>';
            $result .= '<td class="text-center">';
            $result .= '<button type="button" class="btn btn-danger btn-xs px-2" onclick="deletecart(' . $cart['id'] . ')">X</button>';
            $result .= '</td>';
            $result .= '</tr>';
        }
        echo $result;
    }
    public function deletecart(Request $request)
    {
        $id = $request->id;
        MyCart::removeCart('carts', $id);
        $listcat = MyCart::getContent('carts');
        $result = '';
        foreach ($listcat as $cart) {
            $amount = $cart['qty'] * $cart['price'];
            $result .= '<tr>';
            $result .= '<td>';
            $result .= '<img class="img-fluid" src="' . asset('storage/images/product/' . $cart["image"]) . '">';
            $result .= '</td>';
            $result .= '<td>' . $cart['name'] . '</td>';
            $result .= '<td>' . $cart['categoryname'] . '</td>';
            $result .= '<td>' . $cart['brandname'] . '</td>';
            $result .= '<td>' . $cart['price'] . '</td>';
            $result .= '<td><input onclick="changeqtycart(' . $cart['id'] . ')" id="product' . $cart['id'] .
                '" style="width:60px" name="qty[]" type="number" value="' . $cart['qty'] . '" min="0"></td>';
            $result .= '<td>' . $amount . '</td>';
            $result .= '<td class="text-center">';
            $result .= '<button type="button" class="btn btn-danger btn-xs px-2" onclick="deletecart(' . $cart['id'] . ')">X</button>';
            $result .= '</td>';
            $result .= '</tr>';
        }
        echo $result;
    }

    public function selectcustomer(Request $request)
    {
        $id = $request->userid;
        $customer = User::where([['id', '', $id], ['roles', '', 'customer']])->first();
        $result = '<div class="col-md">';
        $result .= '<label>Họ tên (*)</label>';
        $result .= '<input type="text" name="name" value="' . $customer->name . '" class="form-control" readonly>';
        $result .= '</div>';
        $result .= '<div class="col-md">';
        $result .= '<label>Email (*)</label>';
        $result .= '<input type="text" name="email" value="' . $customer->email . '"class="form-control" readonly>';
        $result .= '</div>';
        $result .= '<div class="col-md">';
        $result .= '<label>Điện thoại (*)</label>';
        $result .= '<input type="text" name="phone" value="' . $customer->phone . '" class="form-control" readonly>';
        $result .= '</div>';
        $result .= '<div class="col-md-5">';
        $result .= '<label>Địa chỉ (*)</label>';
        $result .= '<input type="text" name="address" value="' . $customer->address . '" class="form-control" readonly>';
        $result .= '</div>';
        $result .= '<input type="hidden" name="user_id" value="' . $customer->id . '">';
        session(['customer' => $customer]);
        echo $result;
    }

    public function store(Request $request)
    {
        $listcart = $request->listcart;
        $user_id = $request->user_id;
        $user = User::find($user_id);
        $order = new Order();
        $order->user_id = $user_id; //form
        $order->delivery_name = $user->name; //
        $order->delivery_gender = $user->gender; //form
        $order->delivery_email = $user->email; //form
        $order->delivery_phone = $user->phone; //form
        $order->delivery_address = $user->address; //form
        $order->note = 'Mua tại quầy';
        $order->created_at = date('Y-m-d H:i:s');
        $order->created_by = 1;
        $order->status = 1; //form
        if($order->save())
        {
            foreach ($listcart as $cart){
               $product = Product::find($cart['id']);
               $orderdetail = new Orderdetail();
               $orderdetail->order_id = $order->id; 
               $orderdetail->product_id = $cart['id']; //form
               $orderdetail->price = $product->price; //form
               $orderdetail->qty = $cart['qty'];
               $orderdetail->discount = 0;
               $orderdetail->amount = $product->price * $cart['qty'];
               $orderdetail->save();
            }
        } 

    }


    public function storeonline(Request $request)
    {
       
        $listcart = $request->listcart;
        $user_id = $request->user_id;
        $order = new Order();
        $order->user_id = $user_id;
        $order->delivery_name = $request->delivery_name;
        $order->delivery_gender = $request->delivery_gender;
        $order->delivery_email = $request->delivery_email;
        $order->delivery_phone = $request->delivery_phone;
        $order->delivery_address = $request->delivery_address;
        $order->note = 'Mua online';
        $order->created_at = date('Y-m-d H:i:s');
        $order->created_by = 1;
        $order->status = $request->status;
        if ($order->save()) {
            foreach ($listcart as $cart) {
                $product = Product::find($cart['id']);              
                $orderdetail = new Orderdetail();
                $orderdetail->order_id = $order->id;
                $orderdetail->product_id = $cart['id'];
                $orderdetail->price = $product->price;
                $orderdetail->qty = $cart['qty'];
                $orderdetail->discount = 0;
                $orderdetail->amount = $product->price * $cart['qty'];
                $orderdetail->save();
                // Giảm số lượng sản phẩm trong bảng productstore
                $productStore = ProductStore::where('product_id', $cart['id'])->first();
                if ($productStore) {
                    $productStore->qty -= $cart['qty'];
                    if ($productStore->qty < 0) {
                        throw new \Exception('Số lượng sản phẩm trong kho không đủ');
                    }
                    $productStore->save();
                } else {
                    throw new \Exception('Sản phẩm không tồn tại trong kho');
                }
     
            }
        }
    }

}
