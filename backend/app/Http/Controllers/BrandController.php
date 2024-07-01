<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class BrandController extends Controller
{
    
    public function index($status, $page = 1)
    {
        $brands = Brand::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image')
            ->get();
        $total = Brand::count();
        $result = [
            'status' => true,
            'brands' => $brands,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    // thêm dữ liệu
    public function store(Request $request)
    {
        $brand = new Brand();
        $brand->name = $request->name; //reactjs
        $brand->slug = Str::of($request->name)->slug('-');
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/brand'), $fileName);
                $brand->image = $fileName;
            }
        }
        $brand->sort_order = $request->sort_order; //form
        $brand->description = $request->description; //form
        $brand->created_at = date('Y-m-d H:i:s');
        $brand->created_by = 1;
        $brand->status = $request->status; //form
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'Thêm dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Không thể thêm dữ liệu',
        ];
        return response()->json($result, 200);

    }


    public function show($id)
    {
        if (is_numeric($id))
        {
            $brand = Brand::findOrFail($id);
        }
        else
        {
            $brand = Brand::where('slug',$id)->first();
        }
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'brand' => $brand],
            200
        );

    }

    public function status($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1; //tam
        $brand->status = ($brand->status == 1) ? 2 : 1; //reactjs
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'Tải dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Không thể cập nhật dữ liệu',

        ];
        return response()->json($result, 200);

    }
    //sửa 
    function update(Request $request, $id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        $brand->name = $request->name; //reactjs
        $brand->slug = Str::of($request->name)->slug('-');
        //upload file reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/brand'), $fileName);
                $brand->image = $fileName;
            }
        }
        $brand->sort_order = $request->sort_order; //reactjs
        $brand->description = $request->description; //reactjs
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1; //tam
        $brand->status = $request->status; //reactjs
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Không thể cập nhật dữ liệu',
        ];
        return response()->json($result, 200);
    }

    //xóa
    public function destroy($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        if ($brand->delete()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'Xóa dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Không thể xóa dữ liệu',
        ];
        return response()->json($result, 200);
    }

    //Thùng rác
    public function trash($status, $page = 1)
    {
        $brands = Brand::where('status', '==', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image')
            ->get();
        $total = Brand::count();
        $result = [
            'status' => true,
            'brands' => $brands,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    //Xóa vào thùng rác
    public function delete($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1; //tam
        $brand->status = 0; //reactjs
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'Xóa dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }
    //Khôi phục dữ liệu
    public function restore($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1; //tam
        $brand->status = 1; //
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'Khôi phục dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }

}
