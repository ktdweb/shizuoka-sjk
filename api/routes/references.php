<?php
/**
 * Web App REST API
 *
 * @link https://github.com/kobabasu/rest-php.git
 */

namespace Routes;

/**
 * users
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
                if ($item->parts_category_id) {
                    $res[$item->table][$item->parts_category_id][$item->id] = $item->name;
                } else {
                    $res[$item->table][$item->id] = $item->name;
                }
            }

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );
});
