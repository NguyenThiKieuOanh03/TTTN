<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    //BACKEND
    public function index($status, $page = 1)
    {
        $posts = Post::where([['status', '!=', 0], ['type', '=', 'post']])
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'posts' => $posts],
            200
        );
    }
    public function store(Request $request)
    {
        $post = new Post();
        $post->topic_id = $request->topic_id;
        $post->title = $request->title; //form
        $post->slug = Str::of($request->title)->slug('-');
        $post->detail = $request->detail; //form
        $post->type = $request->type;
        $post->description = $request->description; //form
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/post'), $fileName);
                $post->image = $fileName;
            }
        }
        $post->created_at = date('Y-m-d H:i:s');
        $post->created_by = 1;
        $post->status = $request->status; //form
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Thêm dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Không thể thêm dữ liệu',
        ];
        return response()->json($result, 200);

    }

    public function status($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = 1; //tam
        $post->status = ($post->status == 1) ? 2 : 1; //reactjs
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Tải dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Không thể cập nhật dữ liệu',

        ];
        return response()->json($result, 200);

    }
    public function post_topic($limit, $topic_id)
    {
        $listid = array();
        array_push($listid, $topic_id + 0);
        $args_cat1 = [
            ['sort_order', '=', $topic_id + 0],
            ['status', '=', 1]
        ];
        $list_topic1 = Topic::where($args_cat1)->get();
        if (count($list_topic1) > 0) {
            foreach ($list_topic1 as $row1) {
                array_push($listid, $row1->id);
                $args_cat2 = [
                    ['sort_order', '=', $row1->id],
                    ['status', '=', 1]
                ];
                $list_topic2 = Topic::where($args_cat2)->get();
                if (count($list_topic2) > 0) {
                    foreach ($list_topic2 as $row2) {
                        array_push($listid, $row2->id);
                    }
                }
            }
        }
        $posts = Post::where('status', 1)
            ->whereIn('topic_id', $listid)
            ->orderBy('created_at', 'DESC')
            ->limit($limit)
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'posts' => $posts
            ],
            200
        );
    }

    public function show($id)
    {
        if (is_numeric($id)) {
            $post = post::findOrFail($id);

        } else {
            $post = post::where('slug', $id)->first();
        }
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'post' => $post],
            200
        );

    }
    function update(Request $request, $id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        $post->topic_id = $request->topic_id;
        $post->title = $request->title; //form
        $post->slug = Str::of($request->title)->slug('-');
        $post->detail = $request->detail; //form
        $post->type = $request->type;
        $post->description = $request->description; //form
        //upload file reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/post'), $fileName);
                $post->image = $fileName;
            }
        }
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = 1; //tam
        $post->status = $request->status; //reactjs
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Không thể cập nhật dữ liệu',
        ];
        return response()->json($result, 200);
    }
    public function destroy($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        if ($post->delete()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Xóa dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Không thể xóa dữ liệu',
        ];
        return response()->json($result, 200);
    }

    //Thùng rác
    public function trash($status, $page = 1)
    {
        $posts = Post::where('status', '==', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'title', 'slug', 'status', 'image')
            ->get();
        $total = Post::count();
        $result = [
            'status' => true,
            'posts' => $posts,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    //Xóa vào thùng rác
    public function delete($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = 1; //tam
        $post->status = 0; //reactjs
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Xóa dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }
    //Khôi phục dữ liệu
    public function restore($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = 1; //tam
        $post->status = 1; //
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Khôi phục dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }

    //FRONTEND
    public function post_all($limit, $page = 1)
    {
        $posts = Post::where('post.status', '=', 1)
            ->orderBy('created_at', 'DESC')
            ->select('post.id', 'post.title', 'post.slug', 'post.status', 'post.image')
            ->limit($limit)
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'posts' => $posts
            ],
            200
        );
    }



    function post_order($id, $limit)
    {
        $args = [
            ['id', '=', $id],
            ['status', '=', 1]
        ];
        $posts = Post::where($args)
            ->orderBy('created_at', 'DESC')
            ->limit($limit)
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'posts' => $posts
            ],
            200
        );
    }

    function post_list($limit, $type)
    {
        $args = [
            ['type', '=', $type],
            ['status', '=', 1]
        ];
        $posts = Post::where($args)
            ->orderBy('created_at', 'DESC')
            ->limit($limit)
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'posts' => $posts
            ],
            200
        );
    }

    public function post_detail($slug)
    {
        $post = Post::where([['slug', '=', $slug], ['status', '=', 1]])->first();
        if ($post == null) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Không tìm thấy dữ liệu',
                    'post' => null
                ],
                404
            );
        }
        $listid = array();
        array_push($listid, $post->topic_id);
        $args_top1 = [
            ['parent_id', '=', $post->topic_id],
            ['status', '=', 1]
        ];
        $list_topic1 = Topic::where($args_top1)->get();
        if (count($list_topic1) > 0) {
            foreach ($list_topic1 as $row1) {
                array_push($listid, $row1->id);
                $args_top2 = [
                    ['parent_id', '=', $row1->id],
                    ['status', '=', 1]
                ];
                $list_topic2 = Topic::where($args_top2)->get();
                if (count($list_topic2) > 0) {
                    foreach ($list_topic2 as $row2) {
                        array_push($listid, $row2->id);
                    }
                }
            }
        }
        $post_other = Post::where([['id', '!=', $post->id], ['status', '=', 1]])
            ->WhereIn('topic_id', $listid)
            ->orderBy('created_at', 'DESC')
            ->select('id', 'title', 'detail', 'topic_id', 'status', 'image', 'post.slug')
            ->limit(8)
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'post' => $post,
                'post_other' => $post_other,
            ],
            200
        );
    }


}
