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
$app->group('/references', function () {

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
     * GET /references/parts/subs/
     */
    $this->get(
        '/parts/subs/{id:[0-9]+}',
        function (
            $request,
            $response,
            $args
        ) {
            $db = $this->get('db.get');
            $body = array();

            // page
            $sql = 'SELECT `id`, `name` FROM `parts_sub_categories` ';
            $sql .= 'WHERE `parts_category_id` = ?';
            $body = $db->execute($sql, $args['id']);

            $res = null;
            foreach ($body as $item) {
                $res[$item->id] = $item->name;
            }

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );
});
