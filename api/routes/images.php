<?php
/**
 * Web App REST API
 *
 * @link https://github.com/kobabasu/rest-php.git
 */

namespace Routes;


/**
 * references
 */
$app->group('/images', function () {

    /**
     * GET /references/
     */
    $this->get(
        '/',
        function (
            $request,
            $response,
            $args
        ) {
            $db = $this->get('db.get');
            $body = array();

            // page
            $sql = 'SELECT * FROM `references`';
            $body = $db->execute($sql);

            $res = null;
            foreach ($body as $item) {
                $res[$item->table][$item->id] = $item->name;
            }

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );

    /**
     * PUT /references/parts/subs/
     */
    $this->put(
        '/{page:[a-z]+}/{id:.*}',
        function (
            $request,
            $response,
            $args
        ) {
            $body = $request->getParsedBody();

            $ff = explode('/', $body['data']);
            $filename = $ff[1] . '.jpg';
            $url = '/data/' . $args['page'] . '/' . $ff[0] . '/';
            
            if (isset($body['image'])) {
                $base64 = base64_decode($body['image']);
                $image = imagecreatefromstring($base64);
                imagejpeg($image, $url . $filename, 100);
                chmod($url . $filename, 0777);
            }

            return $response->withJson(
                $body,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );
});
