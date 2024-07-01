<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    // BACKEND
    public function index($status, $page = 1)
    {
        $banners = Banner::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'position', 'link', 'status', 'image')
            ->get();
        $total = Banner::count();
        $result = [
            'status' => true,
            'banners' => $banners,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    public function store(Request $request)
    {
        $banner = new Banner();
        $banner->name = $request->name; //reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/banner'), $fileName);
                $banner->image = $fileName;
            }
        }
        $banner->link = $request->link; //form
        $banner->sort_order = $request->sort_order; //form
        $banner->position = $request->position; //form
        $banner->created_at = date('Y-m-d H:i:s');
        $banner->created_by = 1;
        $banner->status = $request->status; //form
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Thêm dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Không thể thêm dữ liệu',
        ];
        return response()->json($result, 200);

    }
    public function status($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; //tam
        $banner->status = ($banner->status == 1) ? 2 : 1; //reactjs
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Tải dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Không thể cập nhật dữ liệu',

        ];
        return response()->json($result, 200);

    }

    public function show($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'banner' => $banner,
            'message' => 'Tải dữ liệu thành công',

        ];
        return response()->json($result, 200);

    }
    function update(Request $request, $id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        $banner->name = $request->name; //reactjs
        //upload file reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/banner'), $fileName);
                $banner->image = $fileName;
            }
        }
        $banner->link = $request->link; //form
        $banner->position = $request->position; //form
        $banner->sort_order = $request->sort_order; //form
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; //tam
        $banner->status = $request->status; //reactjs
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Không thể cập nhật dữ liệu',
        ];
        return response()->json($result, 200);
    }
    public function destroy($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        if ($banner->delete()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Xóa dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Không thể xóa dữ liệu',
        ];
        return response()->json($result, 200);
    }

    //Thùng rác
    public function trash($status, $page = 1)
    {
        $banners = Banner::where('status', '==', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'link', 'status', 'image','position')
            ->get();
        $total = Banner::count();
        $result = [
            'status' => true,
            'banners' => $banners,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    //Xóa vào thùng rác
    public function delete($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; //tam
        $banner->status = 0; //reactjs
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Xóa dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }
    //Khôi phục dữ liệu
    public function restore($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; //tam
        $banner->status = 1; //
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Khôi phục dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
    }

    //FRONTEND
    public function banner_list($position)
    {
        $args = [
            ['position', '=', $position],
            ['status', '=', 1]
        ];
        $banners = Banner::where($args)
            ->orderBy('sort_order', 'ASC')
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'banners' => $banners
            ],
            200
        );
    }


}
