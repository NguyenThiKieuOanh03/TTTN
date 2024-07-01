<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TopicController extends Controller
{
    //BACKEND
    public function index($status, $page = 1)
    {
        $topics = Topic::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status')
            ->get();
        $total = Topic::count();
        $result = [
            'status' => true,
            'topics' => $topics,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    public function store(Request $request)
    {
        $topic = new Topic();
        $topic->name = $request->name; //reactjs
        $topic->slug = Str::of($request->name)->slug('-');
        $topic->sort_order = $request->sort_order; //form
        $topic->description = $request->description; //form
        $topic->created_at = date('Y-m-d H:i:s');
        $topic->created_by = 1;
        $topic->status = $request->status; //form
        if ($topic->save()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Thêm dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'topic' => null,
            'message' => 'Không thể thêm dữ liệu',
        ];
        return response()->json($result, 200);

    }


    public function status($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'topic' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $topic->updated_at = date('Y-m-d H:i:s');
        $topic->updated_by = 1; //tam
        $topic->status = ($topic->status == 1) ? 2 : 1; //reactjs
        if ($topic->save()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Tải dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'topic' => null,
            'message' => 'Không thể cập nhật dữ liệu',

        ];
        return response()->json($result, 200);

    }


    public function show($id)
    {
        if(is_numeric($id)){
            $topic = Topic::find($id);
        }
        else{
            $topic = Topic::where('slug', $id)->first();
        }
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'topic' => $topic],
            200
        );
    }
    function update(Request $request, $id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'topic' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        $topic->name = $request->name; //reactjs
        $topic->slug = Str::of($request->name)->slug('-');
        $topic->sort_order = $request->sort_order; //form
        $topic->description = $request->description; //reactjs
        $topic->updated_at = date('Y-m-d H:i:s');
        $topic->updated_by = 1; //tam
        $topic->status = $request->status; //reactjs
        if ($topic->save()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'topic' => null,
            'message' => 'Không thể cập nhật dữ liệu',
        ];
        return response()->json($result, 200);
    }
    public function destroy($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'topic' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        if ($topic->delete()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Xóa dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'topic' => null,
            'message' => 'Không thể xóa dữ liệu',
        ];
        return response()->json($result, 200);
    }

    //Thùng rác
    public function trash($status, $page = 1)
    {
        $topics = Topic::where('status', '==', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status')
            ->get();
        $total = Topic::count();
        $result = [
            'status' => true,
            'topics' => $topics,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    //Xóa vào thùng rác
    public function delete($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'topic' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $topic->updated_at = date('Y-m-d H:i:s');
        $topic->updated_by = 1; //tam
        $topic->status = 0; //reactjs
        if ($topic->save()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Xóa dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }
    //Khôi phục dữ liệu
    public function restore($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'topic' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $topic->updated_at = date('Y-m-d H:i:s');
        $topic->updated_by = 1; //tam
        $topic->status = 1; //
        if ($topic->save()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Khôi phục dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }

    //FRONTEND
    public function topic_list($sort_order = 0)
    {
        $args = [
            ['sort_order', '=', $sort_order],
            ['status', '=', 1]
        ];
        $topics = Topic::where($args)->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'topics' => $topics
            ],
            200
        );
    }

}
