<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Config;

class ConfigController extends Controller
{

    public function index()
    {
        $configs = Config::where('status', '!=', 0)
        ->orderBy('created_at', 'desc')
        ->select('id', 'author', 'email', 'phone', 'status', 'zalo','facebook','address')
        ->get();
    $result = [
        'status' => true,
        'configs' => $configs,
        'message' => 'Tải dữ liệu thành công',
    ];
    return response()->json($result, 200);
    }
    public function store(Request $request)
    {
        $config = new Config();
        $config->author = $request->author; //reactjs
        $config->email = $request->email; //form
        $config->phone = $request->phone; //form
        $config->zalo = $request->zalo; //form
        $config->facebook = $request->facebook; //form
        $config->address = $request->address; //form
        $config->youtube = $request->youtube; //form
        $config->metadesc = $request->metadesc; //form
        $config->metakey = $request->metakey; //form
        $config->created_at = date('Y-m-d H:i:s');
        $config->created_by = 1;
        $config->status = $request->status; //form
        if ($config->save()) {
            $result = [
                'status' => true,
                'config' => $config,
                'message' => 'Thêm dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'config' => null,
            'message' => 'Không thể thêm dữ liệu',
        ];
        return response()->json($result, 200);
    }

}
