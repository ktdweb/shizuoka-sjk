<?php
/**
 * Web App REST API
 *
 * @link https://github.com/kobabasu/rest-php.git
 */

namespace Lib\ShizuokaSjk;

/**
 * 実際にメールを送る
 *
 * @package ShizuokaSjk
 */

class MergeImgArr
{
    /** @var Object $db /lib/Db/Getオブジェクト */
    private $db = null;

    /**
     * DBオブジェクトを代入
     *
     * @param Object $db
     * @return void
     * @codeCoverageIgnore
     */
    public function __construct(
        \Lib\Db\Get $db
    ) {
        $this->db = $db;
    }

    /**
     * 与えられたレコードにimagesを付け返す(商品全体用)
     *
     * @param Object $body
     * @return Array
     * @codeCoverageIgnore
     */
    public function mergeForAll(
        $body
    ) {
        $res = array();

        if (!empty($body)) {
            $ids = null;
            foreach ($body as $val) {
                $ids .= "'" . $val->ref_id . "', ";
            }
            $ids = substr($ids, 0, -2);
            $sql = 'select * from `images` ';
            $sql .= 'where `ref_id` in (' . $ids . ');';
            $images = $this->db->execute($sql);

            if (!empty($images)) {
                // sort
                foreach ($images as $val) {
                    $paths[$val->ref_id][] = $val->path;
                }

                // merge
                foreach ($body as $val) {
                    $id = $val->ref_id;
                    $page = $val->page;
                    $res[$page][$id] = (array)$val;
                    if (!empty($paths[$id])) {
                        $res[$page][$id]['images'] = $paths[$id];
                    }
                }
            }
        }

        return $res;
    }

    /**
     * 与えられたレコードにimagesを付け返す(各ページ用)
     *
     * @param Object $body
     * @return Array
     * @codeCoverageIgnore
     */
    public function merge(
        $body
    ) {
        $res = array();

        if (!empty($body)) {
            $ids = null;
            foreach ($body as $val) {
                $ids .= "'" . $val->ref_id . "', ";
            }
            $ids = substr($ids, 0, -2);
            $sql = 'select * from `images` ';
            $sql .= 'where `ref_id` in (' . $ids . ');';
            $images = $this->db->execute($sql);

            // sort
            foreach ($images as $val) {
                $paths[$val->ref_id][] = $val->path;
            }

            // merge
            foreach ($body as $val) {
                $id = $val->ref_id;
                $res[$id] = (array)$val;
                if (!empty($paths[$id])) {
                    $res[$id]['images'] = $paths[$id];
                }
            }
        }

        return $res;
    }
}
