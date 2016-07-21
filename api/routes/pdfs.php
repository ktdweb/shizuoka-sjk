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
$app->group('/pdfs', function () {

    /**
     * PUT /images/vehicles/280105H001
     * 管理画面 画像編集用
     */
    $this->put(
        '/{id:.*}',
        function (
            $request,
            $response,
            $args
        ) {
            $db = $this->get('db.put');
            $settings = $this->get('settings');
            $savepath = $settings['image']['save'] . 'vehicle/';

            $body = $request->getParsedBody();
            $path = $args['id'] . '/' . 'shaken';

            $sql = 'UPDATE `vehicles` SET `pdf` = ';
            $sql .= "'" . $path . "';";

            $res = $db->execute($sql);

            $url = $savepath . $args['id'];
            $filename = $url . '/shaken.pdf';
            if (!file_exists($url)) {
                mkdir($url, 0755);
            }

            $h64 = 'data://application/pdf;base64,';
            if (isset($body['data'])) {
                $base64 = base64_decode($body['data']);
                $pdf = fopen($filename, 'w');
                fwrite($pdf, $base64);
                fclose($pdf);
            }

            return $response->withJson(
                $res,
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

            $db = $this->get('db.put');

            $sql = 'UPDATE `vehicles` SET `pdf` = ';
            $sql .= "'';";

            $res = $db->execute($sql);

            $url = $savepath . $args['id'];
            $filename = $url . '/shaken.pdf';
            if (file_exists($filename)) {
                unlink($filename);
            }

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );
});
