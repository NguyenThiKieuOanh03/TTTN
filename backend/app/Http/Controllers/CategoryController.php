<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    // BACKEND

    public function index($status, $page = 1)
    {
        $categorys = Category::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image')
            ->get();
        $total = Category::count();
        $result = [
            'status' => true,
            'categorys' => $categorys,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    public function store(Request $request)
    {
        $category = new Category();
        $category->name = $request->name; //reactjs
        $category->slug = Str::of($request->name)->slug('-');
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/category'), $fileName);
                $category->image = $fileName;
            }
        }
        $category->parent_id = $request->parent_id; //form
        $category->sort_order = $request->sort_order; //form
        $category->description = $request->description; //form
        $category->created_at = date('Y-m-d H:i:s');
        $category->created_by = 1;
        $category->status = $request->status; //form
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Thêm dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Không thể thêm dữ liệu',
        ];
        return response()->json($result, 200);

    }

    public function show($id)
    {
        if (is_numeric($id))
        {
            $category = Category::findOrFail($id);
        }
        else
        {
            $category = Category::where('slug',$id)->first();
        }
        $result = [
            'status' => true,
            'category' => $category,
            'message' => 'Tải dữ liệu thành công',

        ];
        return response()->json($result, 200);

    }
    function update(Request $request, $id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        $category->name = $request->name; //reactjs
        $category->slug = Str::of($request->name)->slug('-');
        //upload file reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/category'), $fileName);
                $category->image = $fileName;
            }
        }
        $category->parent_id = $request->parent_id; //form
        $category->sort_order = $request->sort_order; //reactjs
        $category->description = $request->description; //reactjs
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1; //tam
        $category->status = $request->status; //reactjs
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Không thể cập nhật dữ liệu',
        ];
        return response()->json($result, 200);
    }
    public function status($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1; //tam
        $category->status = ($category->status == 1) ? 2 : 1; //reactjs
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Tải dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Không thể cập nhật dữ liệu',

        ];
        return response()->json($result, 200);

    }


    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        if ($category->delete()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Xóa dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Không thể xóa dữ liệu',
        ];
        return response()->json($result, 200);
    }

    //Thùng rác
    public function trash($status, $page = 1)
    {
        $categorys = Category::where('status', '==', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image')
            ->get();
        $total = Category::count();
        $result = [
            'status' => true,
            'categorys' => $categorys,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    //Xóa vào thùng rác
    public function delete($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1; //tam
        $category->status = 0; //reactjs
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Xóa dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }
    //Khôi phục dữ liệu
    public function restore($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1; //tam
        $category->status = 1; //
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Khôi phục dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }

    //FRONTEND

    public function category_list($parent_id = 0)
    {
        $args = [
            ['parent_id', '=', $parent_id],
            ['status', '=', 1]
        ];
        $categorys = Category::where($args)
            ->orderBy('sort_order', 'ASC')
            ->get();
        $result = [
                'status' => true,
                'categorys' =>$categorys,
                'message' => 'Tải dữ liệu thành công',
    
            ];
            return response()->json($result, 200);
        }

}
