
/*----------------------------------------------------------
// 初期化する関数
----------------------------------------------------------*/
/**
* ロード中スピナーの表示
* @function on beforeunload
* @return void
**/
var nowLoadingInit = function(){
    $(window).on('beforeunload', function() {
        $('.now-loading').show();
    });
}

/**
* 技テーブルクリック時の関数
* @function click
* @return void
**/
var navMoveBoxInit = function(){
    $('.move-detail-link').on('click', function(){
        var target = $(this).data('target');
        // 一旦全てのactiveを解除
        $('.move-detail-content, .move-detail-link').each(function(){
            $(this).removeClass('active');
        });
        // 選択された行と詳細のみをactive化
        $(target).addClass('active');
        $(this).addClass('active');
    });
}

/**
* table-selectedクリック時の関数
* @function click
* @return void
**/
var selectedTableInit = function(){
    $('table.table-selected tbody tr, .table-selected .table-selected-row').on('click', function(){
        var target = $(this).data("target");
        // 行の色替え
        var children;
        if($(this).prop("tagName") === 'TR'){
            // テーブル要素
            children = 'tbody tr';
        }else if($(this).hasClass('table-selected-row')){
            // テーブル要素以外
            children = '.table-selected-row';
        }
        // 子要素が指定されていなければ処理不要
        if(!children){
            return;
        }
        $(this).closest('.table-selected').find(children)
        .each(function(){
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    });
}

/**
 * 二重モーダルを正常に表示するための重ね処理
 * @function on:click
 */
var dubbleModalInit = function() {
    $('[data-dubble_modal="true"]').on('show.bs.modal', function(e) {
        var currentModal = $(e.currentTarget);
        var zIndex = 1040 + 10 * $('.modal:visible').length;
        currentModal.css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop')
                .not('.modal-stack')
                .css('z-index', zIndex - 1)
                .addClass('modal-stack');
        }, 0);
    });
}

/**
 * 指定したモーダルの非表示処理
 * @function on:click
 */
var hideModalInit = function() {
    $('[data-hide_modal]').on('click', function() {
        var modal = $(this).data('hide_modal');
        $(modal).modal('hide');
    });
}

/**
 * 強制モーダルの起動
 * @function ready
 */
var showForceModalInit = function(){
    $(document).ready(function() {
        var force_modal = $('#force-modal');
        if(force_modal.length){
            $(force_modal.val()).modal('show');
        }
    });
}

/**
 * リモートフォームへのサブミット
 *
 * @function on:click
 */
var submitRemoteInit = function() {
    $('[data-submit_remote]').on('click', function(){
        $("#remote-form-action").val($(this).data('submit_remote'))
        $('form#remote-form').submit();
    });
}

/**
 * クリップボードへのコピー
 * @function on:click
 */
var copyToClipboard = function() {
    $('[data-clipboard="true"]').on('click', function(){
        var text;
        var target = $(this).data('target');
        // コピーする文章の取得(もし対象が見つからなければ自身を選択)
        if(target){
            text = $(target).text();
        }else{
            text = $(this).text();
        }
        // テキストエリアに対象テキストをセット
        var textarea = $('<textarea>' + text + '</textarea>');
        $(this).append(textarea);
        // テキストエリアを選択してコピー
        textarea.select();
        document.execCommand('copy');
        // 不要になったテキストエリアを削除
        textarea.remove();
        toastr.success('プレイヤーIDをコピーしました');
    });
}

/**
 * トーストの表示
  * @function each
 */
var showToastrs = function() {
    $(document).ready(function() {
        $('[data-toastr]').each(function(){
            var design = $(this).data('toastr');
            if(0 <= $.inArray(design, ['success', 'info', 'error', 'warning'])){
                // 指定されたデザインのトーストを表示
                toastr[design]($(this).val());
            }
        });
    });
}

/*----------------------------------------------------------
// 処理内で呼び出す関数
----------------------------------------------------------*/


/*----------------------------------------------------------
// 初期化
----------------------------------------------------------*/
jQuery(function($){
    nowLoadingInit();
    navMoveBoxInit();
    selectedTableInit();
    dubbleModalInit();
    hideModalInit();
    submitRemoteInit();
    showForceModalInit();
    copyToClipboard();
    showToastrs();
    // テンプレート関係の処理
    $('[data-toggle="popover"]').popover();
});
