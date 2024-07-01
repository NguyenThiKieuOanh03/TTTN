<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    //BACKEND
    public function index($status, $page = 1)
    {
        $pages = Page::where([['status', '!=', 0], ['type', '=', 'page']])
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'pages' => $pages],
            200
        );
    }
    public function store(Request $request)
    {
        $page = new Page();
        $page->topic_id = $request->topic_id;
        $page->title = $request->title; //form
        $page->slug = Str::of($request->title)->slug('-');
        $page->detail = $request->detail; //form
        $page->type = $request->type;
        $page->description = $request->description; //form
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/post'), $fileName);
                $page->image = $fileName;
            }
        }
        $page->created_at = date('Y-m-d H:i:s');
        $page->created_by = 1;
        $page->status = $request->status; //form
        if ($page->save()) {
            $result = [
                'status' => true,
                'page' => $page,
                'message' => 'Thêm dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'page' => null,
            'message' => 'Không thể thêm dữ liệu',
        ];
        return response()->json($result, 200);

    }


    public function status($id)
    {
        $page = Page::find($id);
        if ($page == null) {
            $result = [
                'status' => false,
                'page' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $page->updated_at = date('Y-m-d H:i:s');
        $page->updated_by = 1; //tam
        $page->status = ($page->status == 1) ? 2 : 1; //reactjs
        if ($page->save()) {
            $result = [
                'status' => true,
                'page' => $page,
                'message' => 'Tải dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'page' => null,
            'message' => 'Không thể cập nhật dữ liệu',

        ];
        return response()->json($result, 200);

    }


    public function show($id)
    {
        $page = Page::find($id);
        if ($page == null) {
            $result = [
                'status' => false,
                'page' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'page' => $page,
            'message' => 'Tải dữ liệu thành công',

        ];
        return response()->json($result, 200);

    }
    function update(Request $request, $id)
    {
        $page = Page::find($id);
        if ($page == null) {
            $result = [
                'status' => false,
                'page' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        $page->topic_id = $request->topic_id;
        $page->title = $request->title; //form
        $page->slug = Str::of($request->title)->slug('-');
        $page->detail = $request->detail; //form
        $page->type = $request->type;
        $page->description = $request->description; //form
        //upload file reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/post'), $fileName);
                $page->image = $fileName;
            }
        }
        $page->updated_at = date('Y-m-d H:i:s');
        $page->updated_by = 1; //tam
        $page->status = $request->status; //reactjs
        if ($page->save()) {
            $result = [
                'status' => true,
                'page' => $page,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'page' => null,
            'message' => 'Không thể cập nhật dữ liệu',
        ];
        return response()->json($result, 200);
    }
    public function destroy($id)
    {
        $page = Page::find($id);
        if ($page == null) {
            $result = [
                'status' => false,
                'page' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        if ($page->delete()) {
            $result = [
                'status' => true,
                'page' => $page,
                'message' => 'Xóa dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'page' => null,
            'message' => 'Không thể xóa dữ liệu',
        ];
        return response()->json($result, 200);
    }

    //Thùng rác
    public function trash($status, $page = 1)
    {
        $pages = Page::where('status', '==', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'title', 'slug', 'status', 'image')
            ->get();
        $total = Page::count();
        $result = [
            'status' => true,
            'pages' => $pages,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    //Xóa vào thùng rác
    public function delete($id)
    {
        $page = Page::find($id);
        if ($page == null) {
            $result = [
                'status' => false,
                'page' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $page->updated_at = date('Y-m-d H:i:s');
        $page->updated_by = 1; //tam
        $page->status = 0; //reactjs
        if ($page->save()) {
            $result = [
                'status' => true,
                'page' => $page,
                'message' => 'Xóa dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }
    //Khôi phục dữ liệu
    public function restore($id)
    {
        $page = Page::find($id);
        if ($page == null) {
            $result = [
                'status' => false,
                'page' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $page->updated_at = date('Y-m-d H:i:s');
        $page->updated_by = 1; //tam
        $page->status = 1; //
        if ($page->save()) {
            $result = [
                'status' => true,
                'page' => $page,
                'message' => 'Khôi phục dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }

    //FRONTEND
    function page_list($limit, $type)
    {
        $args = [
            ['type', '=', $type],
            ['status', '=', 1]
        ];
        $pages = Page::where($args)
            ->orderBy('created_at', 'DESC')
            ->limit($limit)
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'pages' => $pages
            ],
            200
        );
    }

}
