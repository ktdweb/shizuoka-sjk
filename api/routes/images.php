<?php
/**
 * Web App REST API
 *
 * @link https://github.com/kobabasu/rest-php.git
 */

namespace Routes;

/**
 * images
 */
$app->group('/images', function () {

    /**
     * PUT /images/vehicles/280105H001
     * 管理画面 画像編集用
     */
    $this->put(
        '/{page:[a-z]+}/{id:.*}',
        function (
            $request,
            $response,
            $args
        ) {
            $settings = $this->get('settings');
            $savepath = $settings['image']['save'];

            $body = $request->getParsedBody();

            $ff = explode('/', $body['data']);

            if ($body['num'] == 'new') {
                $ff[0] = $body['ref_id'];
                $ff[1] = date('Ymd_His', strtotime('now'));
                $path = $ff[0] . '/' . $ff[1];

                $db = $this->get('db.post');

                $sql = 'INSERT INTO `images`(
                        `category_id`,
                        `ref_id`,
                        `path`
                    ) VALUES ';
                $sql .= "(3, '{$body['ref_id']}', '{$path}');";

                $db->execute($sql);
            }

            $filename = $ff[1] . '.jpg';
            $filename_s = $ff[1] . 's.jpg';

            $path = $savepath;
            $url = $path . $args['page'] . '/' . $ff[0];
            if (!file_exists($url)) {
                mkdir($url, 0755);
            }
            $h64 = 'data://application/octet-stream;base64,';
            
            if (isset($body['image'])) {
                $base64 = base64_decode($body['image']);
                list($w, $h) = getimagesize(
                    $h64 . $body['image']
                );

                $image = imagecreatefromstring($base64);

                imagejpeg($image, $url . '/' . $filename, 100);
                chmod($url . '/' . $filename, 0777);

                $thumb = imagecreatetruecolor(
                    160,
                    $h * (160 / $w)
                );

                imagecopyresized(
                    $thumb,
                    $image,
                    0,
                    0,
                    0,
                    0,
                    160,
                    $h * (160 / $w),
                    $w,
                    $h
                );

                imagejpeg($thumb, $url . '/' . $filename_s, 100);
                chmod($url . '/' . $filename_s, 0777);

                imagedestroy($image);
            }

            return $response->withJson(
                $body,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );

    /**
     * DELETE
     * 管理画面 画像削除用
     */
    $this->delete(
        '/{id:.*}',
        function (
            $request,
            $response,
            $args
        ) {
            $settings = $this->get('settings');
            $savepath = $settings['image']['save'];

            $body = $request->getParsedBody();

            $db = $this->get('db.delete');

            // 新規登録の場合はスルー
            if ($body['num'] != 'new') {
                $sql = 'DELETE FROM `images` ';
                $sql .= "WHERE `path` = '" . $body['data'] . "';";

                $res = $db->execute($sql);

                $page = substr($body['page'], 0, -1);

                $url = $savepath . $page . '/';
                unlink($url . $body['data'] . '.jpg');
                unlink($url . $body['data'] . 's.jpg');
            }

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );
});
