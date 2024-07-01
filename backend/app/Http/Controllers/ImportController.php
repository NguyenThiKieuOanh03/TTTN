<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\ProductStore;
use App\Libraries\MyCart;

class ImportController extends Controller
{
    public function index()
    {
        $products = Product::where('product.status', '!=', 0)
            ->join('category', 'category.id', '=', 'product.category_id')
            ->join('brand', 'brand.id', '=', 'product.brand_id')
            ->join('productstore', 'productstore.product_id', '=', 'product.id')
            ->select('product.id', 'product.name', 'product.slug', 'product.status', 'product.image', 'category.name as categoryname', 'brand.name as brandname', 'productstore.priceroat', 'productstore.qty as quantity')
            ->orderBy('product.created_at')
            ->get();
        $listproductyCart = MyCart::getContent('listproduct');
        return view('backend.import.index', compact('products', 'listproduct'));
    }

    public function selectproduct(Request $request)
    {
        $id = $request->id;
        $product = Product::where('product.id', $id)
            ->join('category', 'category.id', '=', 'product.category_id')
            ->join('brand', 'brand.id', '=', 'product.brand_id')
            ->select('product.id, product.price, product.name', 'product.image', 'category.name as categoryname", "brand.name as brandname')
            ->first();
        $cart_item = [
            'id' => $id,
            'name' => $product->name,
            'qty' => 1,
            'price' => 1000,
            'image' => $product->image,
            'categoryname' => $product->categoryname,
            'brandname' => $product->brandname
        ];
        MyCart::addCart('listproduct', $cart_item);
        $listproduct = MyCart::getContent('listproduct');
        $result = '';
        foreach ($listproduct as $rowpro) {
            $result .= '<tr>';
            $result .= '<td class="text-center"><img class="img-fluid" src="' . asset('storage/images/product/' . $rowpro["image"]) . '"></td>';
            $result .= '<td>' . $rowpro['name'] . '</td>';
            $result .= '<td>' . $rowpro['categoryname'] . '</td>';
            $result .= '<td>' . $rowpro['brandname'] . '</td>';
            $result .= '<td><input style="width:120px" name="price[' . $rowpro['id'] . ']" type="number" min="' . $rowpro
            ['price'] . '"value="' . $rowpro['price'] . '"/></td>';
            $result .= '<td><input style="width: 120px" name="qty[' . $rowpro['id'] . ']" type="number" min="' . $rowpro['qty'] . '"value="' . $rowpro['qty'] . '"/></td>';
            $result .= '<td>';
            $result .= '<button type="button" class="btn btn-sm btn-danger">Xóa</button>';
            $result .= '</td>';
            $result .= '</tr>';
        }
        echo $result;
    }
    public function storeimport(Request $request)
    {
        $arr_qty = $request->qty;
        $arr_price = $request->price;
        foreach ($arr_price as $productid->$price) {
            $productstore = new Productstore();
            $productstore->product_id = $request->productid;
            $productstore->price = $request->price;
            $productstore->qty = $arr_qty;
            $productstore->created_at = date('Ymd H:i:s');
            $productstore->created_by = Auth::id() ?? 1;
            $productstore->save();
        }
        session()->forget('listproduct');
        // toastr()->success("Thành công!", "thông báo');
        return redirect()->route('import.index');
    }
}
