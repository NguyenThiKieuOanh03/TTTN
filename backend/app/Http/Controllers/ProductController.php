<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Orderdetail;
use App\Models\ProductSale;
use App\Models\ProductStore;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ProductController extends Controller
{
    //BACKEND
    public function index($status, $page = 1)
    {
        $products = Product::where('product.status', '!=', 0)
            ->join('category', 'category.id', '=', 'product.category_id')
            ->join('brand', 'brand.id', '=', 'product.brand_id')
            ->orderBy('product.created_at', 'desc')
            ->select('product.id', 'product.name', 'product.price', 'category.name as catname', 'brand.name as brname', 'product.status', 'product.image')
            ->get();
        $total = Product::count();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    public function store(Request $request)
    {
        $product = new Product();
        $product->name = $request->name; //form
        $product->slug = Str::of($request->name)->slug('-');
        $product->category_id = $request->category_id; //form
        $product->brand_id = $request->brand_id; //form
        $product->detail = $request->detail; //form
        $product->description = $request->description; //form
        $product->price = $request->price; //form
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/product'), $fileName);
                $product->image = $fileName;
            }
        }
        $product->created_at = date('Y-m-d H:i:s');
        $product->created_by = 1;
        $product->status = $request->status; //form
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Thêm dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Không thể thêm dữ liệu',
        ];
        return response()->json($result, 200);

    }


    public function status($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1; //tam
        $product->status = ($product->status == 1) ? 2 : 1; //reactjs
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Tải dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Không thể cập nhật dữ liệu',

        ];
        return response()->json($result, 200);

    }


    public function show($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'product' => $product,
            'message' => 'Tải dữ liệu thành công',

        ];
        return response()->json($result, 200);

    }

    public function edit(string $id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'message' => "Không tìm thấy thông tin",
                'product' => null
            ];
            return response()->json($result, 200);
        }
        $categorys = Category::where('status', '!=', 0)
            ->select('name', 'id', 'status')
            ->orderBy('created_at', 'DESC')
            ->get();
        $brands = Brand::where('status', '!=', 0)
            ->select('name', 'id', 'status')
            ->orderBy('created_at', 'DESC')
            ->get();
        $result = [
            'status' => true,
            'message' => "Tài dữ liệu thành công",
            'product' => $product
        ];
        return response()->json($result, 200);
    }
    function update(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 200);
        }
        $product->name = $request->name; //form
        $product->slug = Str::of($request->name)->slug('-');
        $product->category_id = $request->category_id; //form
        $product->brand_id = $request->brand_id; //form
        $product->detail = $request->detail; //form
        $product->description = $request->description; //form
        $product->price = $request->price; //form
        //upload file reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/product'), $fileName);
                $product->image = $fileName;
            }
        }
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1; //tam
        $product->status = $request->status; //reactjs
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Không thể cập nhật dữ liệu',
        ];
        return response()->json($result, 200);
    }
    public function destroy(string $id)
    {
        $product = Product::where([['id', '=', $id], ['status', '=', 0]])->first();
        if ($product == null) {
            $result = [
                'status' => false,
                'message' => "Không tìm thấy thông tin",
                'product' => null
            ];
            return response()->json($result, 200);
        }
        if (File::exists(public_path('images/product/' . $product->image))) {
            File::delete(public_path('images/product/' . $product->image));
        }
        if ($product->delete()) {
            //ProductSale
            $list_product_sale = ProductSale::where('product_id', $id)->get();
            foreach ($list_product_sale as $product_sale) {
                $product_sale->delete();
            }
            //ProductStore
            $list_product_store = ProductStore::where('product_id', $id)->get();
            foreach ($list_product_store as $product_store) {
                $product_store->delete();
            }
            $result = [
                'status' => true,
                'message' => "Tài dữ liệu thành công",
                'product' => $product
            ];
            return response()->json($result, 200);
        }
    }
    //Thùng rác
    public function trash($status, $page = 1)
    {
        $products = Product::where('status', '==', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'category_id', 'brand_id', 'status', 'image')
            ->get();
        $total = Product::count();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    //Xóa vào thùng rác
    public function delete($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $count_orderdetail = Orderdetail::where('product_id', $id)->count();
        if ($count_orderdetail > 0) {
            $result = [
                'status' => false,
                'message' => "Không tìm thấy thông tin",
                'product' => null
            ];
            return response()->json($result, 200);
        }
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1; //tam
        $product->status = 0; //reactjs
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Xóa dữ liệu thành công',

            ];
            return response()->json($result, 200);

        }
    }
    //Khôi phục dữ liệu
    public function restore($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1; //tam
        $product->status = 1; //
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Khôi phục dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }

    public function sale()
    {
        $products = Product::where('product.status', '!=', 0)
            ->join('productsale', 'productsale.product_id', '=', 'product.id')
            ->orderBy('product.created_at', 'desc')
            ->select('product.name', 'product.price', 'product.image', 'productsale.pricesale', 'productsale.date_begin', 'productsale.date_end')
            ->get();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }

    public function storesale(Request $request)
    {
        $productsale = new ProductSale();
        $productsale->product_id = $request->product_id;
        $productsale->pricesale = $request->pricesale;
        $productsale->date_begin = $request->date_begin;
        $productsale->date_end = $request->date_end;
        $productsale->created_at = date('Y-m-d H:i:s');
        $productsale->created_by = 1;
        if ($productsale->save()) {
            $result = [
                'status' => true,
                'productsale' => $productsale,
                'message' => 'Tải dữ liệu khuyen mai thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'productsale' => null,
            'message' => 'Loi',
        ];
        return response()->json($result, 200);
    }

    public function import()
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as sum_qty'), DB::raw('AVG (priceroot) as avg_priceroot'))
            ->groupBy('product_id');
        $products = Product::where("product.status", "!=", 0)
            ->join('category', 'category.id', '=', 'product.category_id')
            ->join('brand', 'brand.id', '=', 'product.brand_id')
            ->leftJoinSub($productstore, "productstore", function ($join) {
                $join->on('product.id', '=', 'productstore.product_id');
            })
            ->select(
                'product.id',
                'product.slug',
                'product.image',
                'product.created_at',
                'product.status',
                'product.name',
                'product.price',
                'category.name as categoryname',
                'brand.name as brandname',
                'productstore.sum_qty',
                'productstore.avg_priceroot'
            )
            ->orderBy('created_at', 'desc')->get();
        $result = [
            'status' => true,
            'message' => "Tài dữ liệu thành công",
            'products' => $products
        ];
        return response()->json($result, 200);
    }

    public function storeimport(Request $request)
    {

        $productstore = new ProductStore();
        $productstore->product_id = $request->id;
        $productstore->qty = $request->qty;
        $productstore->priceroot = $request->priceroot;
        $productstore->created_at = date('Y-m-d H:i:s');
        $productstore->created_by = Auth::id() ?? 1;
        if ($productstore->save()) {
            $result = [
                'status' => true,
                'message' => "Tài dữ liệu thành công",
                'productstore' => $productstore
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'message' => "Chưa nhập được",
            'productstore' => null,
        ];
        return response()->json($result, 200);
    }

    //FRONTEND
    public function productnew($limit)
    {
        $now = now(); 
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty)as sum_qty'))
            ->groupBy('product_id');
        $products = Product::where('product.status', '=', 1)
            ->joinSub($productstore, 'productstore', function ($join) {
                $join->on('productstore.product_id', '=', 'product.id');
            })
            ->leftJoin('productsale', function ($join) use ($now) {
                $join->on('productsale.product_id', '=', 'product.id')
                    ->where('productsale.date_end', '>=', $now); 
            })
            ->orderBy('product.created_at', 'desc')
            ->select("product.id", "product.name", "product.image", "product.price", "product.slug", "productsale.pricesale",
            "productsale.date_begin","productsale.date_end")
            ->limit($limit)
            ->get();
        $result = [
            'status' => false,
            'products' => $products,
            'message' => 'tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    ////////
    public function producthotbuy($limit)
    {
        $now = now(); 
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as sum_qty'))
            ->groupBy('product_id');
        $orderdetail = Orderdetail::select('product_id', DB::raw('SUM(qty) as order_qty'))
            ->groupBy('product_id');
        $products = Product::where("product.status", "=", 1)
            ->joinSub($productstore, 'productstore', function ($join) {
                $join->on('productstore.product_id', '=', 'product.id');
            })
            ->joinSub($orderdetail, 'orderdetail', function ($join) {
                $join->on('orderdetail.product_id', '=', 'product.id');
            })
            ->leftJoin('productsale', function ($join) use ($now) {
                $join->on('productsale.product_id', '=', 'product.id')
                    ->where('productsale.date_end', '>=', $now); 
            })
            ->orderBy('orderdetail.order_qty', 'desc')
            ->select('product.id', 'product.name', 'product.image', 'product.price', 'product.slug', 'productsale.pricesale',
            'productsale.date_begin','productsale.date_end')
            ->limit($limit)
            ->get();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);

    }
    ///////
    public function productsale($limit)
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as sum_qty'))
            ->groupBy('product_id');
        $products = Product::where("product.status", "=", 1)
            ->where('productsale.date_begin', '<=', Carbon::now())
            ->where('productsale.date_end', '>=', Carbon::now())
            ->joinSub($productstore, 'productstore', function ($join) {
                $join->on('productstore.product_id', '=', 'product.id');
            })
            ->leftJoin('productsale', 'productsale.product_id', '=', 'product.id')
            ->orderBy('product.created_at', 'desc')
            ->select('product.id', 'product.name', 'product.image', 'product.price', 'product.slug','productsale.pricesale')
            ->limit($limit)
            ->get();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);

    }

    public function product_home($limit, $category_id=0)
    {
        $now = now(); // Lấy thời điểm hiện tại
        $listid = array();
        array_push($listid, $category_id + 0);
        $args_cat1 = [
            ['parent_id', '=', $category_id + 0],
            ['status', '=', 1]
        ];
        $list_category1 = Category::where($args_cat1)->get();
        if (count($list_category1) > 0) {
            foreach ($list_category1 as $row1) {
                array_push($listid, $row1->id);
                $args_cat2 = [
                    ['parent_id', '=', $row1->id],
                    ['status', '=', 1]
                ];
                $list_category2 = Category::where($args_cat2)->get();
                if (count($list_category2) > 0) {
                    foreach ($list_category2 as $row2) {
                        array_push($listid, $row2->id);
                    }
                }
            }
        }
        $products = Product::where('status', '=', 1)
            ->whereIn('category_id', $listid)
            ->leftJoin('productsale', function ($join) use ($now) {
                $join->on('productsale.product_id', '=', 'product.id')
                    ->where('productsale.date_end', '>=', $now); 
            })
            ->orderBy('product.created_at', 'DESC')
            ->limit($limit)
            ->select(
                'product.id',
                'product.name',
                'product.image',
                'product.price',
                'product.slug',
                'productsale.pricesale', // Thêm cột giá sale
                'productsale.date_begin',
                'productsale.date_end'
            )
            ->get();

            if(count($products)>0)
            {
                return response()->json(
                [
                    'success' => true,
                    'message' => 'Tải dữ liệu thành công',
                    'products' => $products
                ],
                200
            );
        }
        else
        {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Không có dữ liệu',
                    'products' => null
                ],
                200
            );
        }
    }

    public function product_all($limit)
    {
        $now = now(); // Lấy thời điểm hiện tại
        $products = Product::where('status', 1)
            ->leftJoin('productsale', function ($join) use ($now) {
                $join->on('productsale.product_id', '=', 'product.id')
                    ->where('productsale.date_end', '>=', $now); 
            })
            ->orderBy('product.created_at', 'DESC')
            ->limit($limit)
            ->select(
                'product.id',
                'product.name',
                'product.image',
                'product.price',
                'product.slug',
                'productsale.pricesale', // Thêm cột giá sale
                'productsale.date_begin',
                'productsale.date_end'
            )
            ->get();

        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'products' => $products
            ],
            200
        );
    }
    public function product_category($limit,$category_id)
    {
        $now = now();
        $listid = array();
        array_push($listid, $category_id + 0);
        $args_cat1 = [
            ['parent_id', '=', $category_id + 0],
            ['status', '=', 1]
        ];
        $list_category1 = Category::where($args_cat1)->get();
        if (count($list_category1) > 0) {
            foreach ($list_category1 as $row1) {
                array_push($listid, $row1->id);
                $args_cat2 = [
                    ['parent_id', '=', $row1->id],
                    ['status', '=', 1]
                ];
                $list_category2 = Category::where($args_cat2)->get();
                if (count($list_category2) > 0) {
                    foreach ($list_category2 as $row2) {
                        array_push($listid, $row2->id);
                    }
                }
            }
        }
        $products = Product::where('status', 1)
            ->whereIn('category_id', $listid)
            ->leftJoin('productsale', function ($join) use ($now) {
                $join->on('productsale.product_id', '=', 'product.id')
                    ->where('productsale.date_end', '>=', $now);
            })
            ->orderBy('product.created_at', 'DESC')
            ->limit($limit)
            ->select(
                'product.id',
                'product.name',
                'product.image',
                'product.price',
                'product.slug',
                'productsale.pricesale',
                'productsale.date_begin',
                'productsale.date_end'
            )
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'products' => $products
            ],
            200
        );
    }

    public function product_brand($limit,$brand_id)
    {
        $now = now();
        $products = Product::where([['brand_id', '=', $brand_id], ['status', '=', 1]])
        ->leftJoin('productsale', function ($join) use ($now) {
            $join->on('productsale.product_id', '=', 'product.id')
                ->where('productsale.date_end', '>=', $now);
        })
        ->orderBy('product.created_at', 'DESC')
        ->limit($limit)
        ->select(
            'product.id',
            'product.name',
            'product.image',
            'product.price',
            'product.slug',
            'productsale.pricesale',
            'productsale.date_begin',
            'productsale.date_end'
        )
        ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'products' => $products
            ],
            200
        );
    }

    public function product_detail($slug)
    {
        $product = Product::where([['slug','=',$slug],['status','=',1]])->first();
        if ($product == null)
        {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Không tìm thấy dữ liệu',
                    'product' => null
                ],
                404
            );
        }
            $listid = array();
            array_push($listid, $product->category_id);
            $args_cat1 = [
                ['parent_id', '=', $product->category_id],
                ['status', '=', 1]
            ];
            $list_category1 = Category::where($args_cat1)->get();
            if (count($list_category1) > 0) {
                foreach ($list_category1 as $row1) {
                    array_push($listid, $row1->id);
                    $args_cat2 = [
                        ['parent_id', '=', $row1->id],
                        ['status', '=', 1]
                    ];
                    $list_category2 = Category::where($args_cat2)->get();
                    if (count($list_category2) > 0) {
                        foreach ($list_category2 as $row2) {
                            array_push($listid, $row2->id);
                        }
                    }
                }
            }
        $product_other = Product::where([['id','!=',$product->id],['status','=',1]])
            ->WhereIn('category_id',$listid)
            ->orderBy('created_at','DESC')
            ->select('id','name','price','category_id','brand_id','status','image','product.slug')
            ->limit(8)
            ->get();
            return response()->json(
                [
                    'success' => true,
                    'message' => 'Tải dữ liệu thành công',
                    'product' => $product,
                    'product_other' =>$product_other,
                ],
                200
            );
    }


    public function product_search($key)
    {
        $args = [
            ['name',"Like" , "%$key%"],
            ['status', '=', 1]
        ];
        $products = Product::where($args)
            ->get();
        if(count($products) > 0){
            return response()->json(
                [
                    'success' => true,
                    'message' => 'Tải dữ liệu thành công',
                    'products' => $products
                ],
                200
            );    
        }
        else{
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Không có dữ liệu',
                    'products' => null
                ],
                200
            );    
        }
    }

}
