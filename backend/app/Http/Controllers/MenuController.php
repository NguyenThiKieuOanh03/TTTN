<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Post;
use App\Models\Topic;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    //BACKEND
    public function index($status, $page = 1)
    {
        $menus = Menu::where('status', '!=', 0)
            ->orderBy('created_at')
            ->select('id', 'name', 'link', 'status', 'position', 'type')
            ->get();

        $brands = Brand::where('status', '!=', 0)
            ->orderBy('created_at')
            ->select('id', 'name', 'slug', 'status')
            ->get();

        $categorys = Category::where('status', '!=', 0)
            ->orderBy('created_at')
            ->select('id', 'name', 'slug', 'status')
            ->get();

        $topics = Topic::where('status', '!=', 0)
            ->orderBy('created_at')
            ->select('id', 'name', 'slug', 'status')
            ->get();

        $pages = Post::where('status', '!=', 0)
            ->orderBy('created_at')
            ->select('id', 'title', 'slug', 'status')
            ->get();

        $result = [
            'status' => true,
            'menus' => $menus,
            'categorys' => $categorys,
            'brands' => $brands,
            'topics' => $topics,
            'pages' => $pages,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }
    public function store(Request $request)
    {
        if (isset($request->ADDCATEGORY)) {
            $listcategoryid = $request->categoryid;
            foreach ($listcategoryid as $id) {
                $category = Category::find($id);
                $menu = new Menu();
                $menu->name = $category->name;
                $menu->link = 'danh-muc/' . $category->slug;
                $menu->position = $request->position;
                $menu->sort_order = 1;
                $menu->parent_id = 0;
                $menu->type = 'category';
                $menu->table_id = $category->id;
                $menu->created_at = date('Y-m-d H:i:s');
                $menu->created_by = Auth::id() ?? 1;
                $menu->status = 1;
                $menu->save();
            }
            $result = [
                'status' => true,
                'message' => 'Tai dữ liệu thanh cong',
                'menu' => $menu,
            ];
            return response()->json($result, 200);
        }

        // brand
        if (isset($request->ADDBRAND)) {
            $listbrandid = $request->brandid;
            foreach ($listbrandid as $id) {
                $brand = Brand::find($id);
                $menu = new Menu();
                $menu->name = $brand->name;
                $menu->link = 'thuong-hieu/' . $brand->slug;
                $menu->position = $request->position;
                $menu->sort_order = 1;
                $menu->parent_id = 0;
                $menu->type = 'brand';
                $menu->table_id = $brand->id;
                $menu->created_at = date('Y-m-d H:i:s');
                $menu->created_by = Auth::id() ?? 1;
                $menu->status = 1;
                $menu->save();
            }
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Tai dữ liệu thanh cong',
            ];
            return response()->json($result, 200);
        }

        // topic
        if (isset($request->ADDTOPIC)) {
            $listtopicid = $request->topicid;
            foreach ($listtopicid as $id) {
                $topic = Topic::find($id);
                $menu = new Menu();
                $menu->name = $topic->name;
                $menu->link = 'chu-de/' . $topic->slug;
                $menu->position = $request->position;
                $menu->sort_order = 1;
                $menu->parent_id = 0;
                $menu->type = 'topic';
                $menu->table_id = $topic->id;
                $menu->created_at = date('Y-m-d H:i:s');
                $menu->created_by = Auth::id() ?? 1;
                $menu->status = 1;
                $menu->save();
            }
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Tai dữ liệu thanh cong',
            ];
            return response()->json($result, 200);
        }

        //page
        if (isset($request->ADDPAGE)) {
            $listpageid = $request->pageid;
            foreach ($listpageid as $id) {
                $page = Post::find($id);
                $menu = new Menu();
                $menu->name = $page->title;
                $menu->link = 'trang-don/' . $page->slug;
                $menu->position = $request->position;
                $menu->sort_order = 1;
                $menu->parent_id = 0;
                $menu->type = 'page';
                $menu->table_id = $page->id;
                $menu->created_at = date('Y-m-d H:i:s');
                $menu->created_by = Auth::id() ?? 1;
                $menu->status = 1;
                $menu->save();
            }
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Tai dữ liệu thanh cong',
            ];
            return response()->json($result, 200);
        }

        if (isset($request->ADDCUSTOM)) {
            $menu = new Menu();
            $menu->name = $request->name;
            $menu->link = $request->link;
            $menu->position = $request->position;
            $menu->sort_order = 1;
            $menu->parent_id = 0;
            $menu->type = 'custom';
            $menu->created_at = date('Y-m-d H:i:s');
            $menu->created_by = Auth::id() ?? 1;
            $menu->status = 1;
            $menu->save();
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Tai dữ liệu thanh cong',
            ];
            return response()->json($result, 200);
        }

    }


    public function show(string $id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'menu' => $menu,
            'message' => 'Tải dữ liệu thành công',

        ];
        return response()->json($result, 200);

    }

    public function edit(string $id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 200);
        }

        $menus = Menu::where('status', '!=', 0)
            ->orderBy('created_at')
            ->select('id', 'name', 'sort_order')
            ->get();

        $parent_id_html = '';
        foreach ($menus as $item) {
            if ($menu->parent_id == $item->id) {
                $parent_id_html .= '<option selected value="' . $item->id . '">' . $item->name . '</option>';
            } else {
                $parent_id_html .= '<option value="' . $item->id . '">' . $item->name . '</option>';
            }
        }
        $sort_order_html = '';
        foreach ($menu as $item) {
            if ($menu->sort_order - 1 == $item->sort_order) {
                $sort_order_html .= '<option selected value="' . ($item->sort_order + 1) . '">Sau:' . $item->name . '</option>';
            } else {
                $sort_order_html .= '<option value="' . ($item->sort_order + 1) . '">Sau:' . $item->name . '</option>';
            }
        }
        $result = [
            'status' => true,
            'menu' => $menu,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 200);
        }
        $menu->name = $request->name; //reactjs
        $menu->link = $request->link; //form
        $menu->parent_id = $request->parent_id; //form
        $menu->sort_order = $request->sort_order; //form
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->updated_by = 1; //tam
        $menu->status = $request->status; //reactjs
        if ($menu->save())
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
        return response()->json($result, 200);

    }

    public function status(string $id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 200);
        }
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->updated_by = 1; //tam
        $menu->status = ($menu->status == 1) ? 2 : 1; //reactjs
        if ($menu->save()) {
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Tải dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'menu' => null,
            'message' => 'Không thể cập nhật dữ liệu',

        ];
        return response()->json($result, 200);

    }


    public function destroy($id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        if ($menu->delete()) {
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Xóa dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'menu' => null,
            'message' => 'Không thể xóa dữ liệu',
        ];
        return response()->json($result, 200);
    }

    //Thùng rác
    public function trash($status, $page = 1)
    {
        $menus = Menu::where('status', '==', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'link', 'status', 'position')
            ->get();
        $total = Menu::count();
        $result = [
            'status' => true,
            'menus' => $menus,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    //Xóa vào thùng rác
    public function delete($id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->updated_by = 1; //tam
        $menu->status = 0; //reactjs
        if ($menu->save()) {
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Xóa dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }
    //Khôi phục dữ liệu
    public function restore($id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->updated_by = 1; //tam
        $menu->status = 1; //
        if ($menu->save()) {
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Khôi phục dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }

    public function menu_parentid($id)
    {
        $menus = Category::where([['status', '=', 1], ['parent_id', '=', $id]])
            ->orderBy('sort_order', 'asc')
            ->get();
        $result = [
            'status' => true,
            'menus' => $menus,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);

    }

    //FRONTEND

    public function menu_list($position, $parent_id ,$status=1)
    {
        $args = [
            ['position', '=', $position],
            ['parent_id', '=', $parent_id],
            ['status', '=', 1]
        ];
        $menus = Menu::where($args)
            ->orderBy('sort_order', 'ASC')
            ->get();
        if(count($menus)>0)
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'menus' => $menus
            ],
            200
        );
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

}
