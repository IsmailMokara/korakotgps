var url = document.URL;
url = url.split("/");
var l_s_s = "";
if (url[2] == "localhost")
{
    l_s_s = "localhsot";
    url = url[0] + "/" + url[1] + "/" + url[2] + "/" + url[3] + "/"
} else
{
    l_s_s = "server";
    url = url[0] + "/" + url[1] + "/" + url[2] + "/"
}



function file_click(id)
{
    mtitle = document.getElementById('title').value;
    malbum_id = '';
    if ($("#album_id").length)
    {
        //alert('sdhfjksa');
        malbum_id = document.getElementById('album_id').value;
    } else
    {
        malbum_id = 'xx';
    }

    if (mtitle == '')
    {
        apprise('অনুগ্রহ	করে প্রথমে টাইটেল এন্ট্রি করুন।');
        document.getElementById('title').focus();
    } else if (malbum_id == '' && malbum_id !== 'xx')
    {
        apprise('অনুগ্রহ করে এ্যাবাম সিলেক্ট করুন।');
        document.getElementById('title').focus();
    } else
    {
        document.getElementById(id).click();
    }
}

function login_check()
{
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    if (user == '')
    {
        document.getElementById("login_error").innerHTML = "Please Fill EIIN";
    } else if (pass == '')
    {
        document.getElementById("login_error").innerHTML = "Please Fill Password";
    } else
    {
        $.post("login_check.php", {user: user, pass: pass}, function (result)
        {
            if (result == 'ok')
            {
                window.location.href = "index.php?page=home.html";
            } else
            {
                document.getElementById("login_error").innerHTML = result;
            }
        });
    }
}

function show_photo(input, id)
{
    if (input.files && input.files[0])
    {
        var reader = new FileReader();
        reader.onload = function (e)
        {
            $('#' + id)
                    .attr('src', e.target.result)
                    .width(120)
                    .height(120);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function change_logo()
{
    document.getElementById("previous_photo").value = document.getElementById("photo_name").innerHTML;
    document.getElementById("photo_name").innerHTML = '<img src="' + base_url + 'assets/img/loding.gif">';
    $("#photo_form").ajaxForm({target: '#photo_name'}).submit();

}

function upload_logo()
{
    $("#logo_form").ajaxForm({target: '#logo_msg'}).submit();
}

function save_file()
{
    document.getElementById("file_name").innerHTML = '<img src="../loding.gif">';
    $("#data_form").ajaxForm({target: '#file_name'}).submit();
}

function save_file1($mmid)
{

    document.getElementById($mmid).innerHTML = '<img src="../loding.gif">Please wait...';
}

function refresh_logo(eiin)
{
    var sta = document.getElementById("logo_msg").innerHTML;

    if (sta == "Logo Change Success")
    {
        document.getElementById("ins_logo").src = url + "logo" + "/" + eiin + ".png";
        document.getElementById("ins_logo").src = document.getElementById("ins_logo").src.split('?')[0] + '?' + new Date().getTime();
    }
}

function data_delete(id, eiin, name, table, file, msg){
    
    apprise(msg + ' মুছে যাবে।<hr> আপনি নিশ্চত হলে [Yes] বাটনে ক্লিক করুন।', {'animate': true, 'verify': true}, function (r) {
        if (r){
            $.post("dba.php", {action:'delete', table:table, id:id, eiin: eiin, file: file}, function (result){
                if (result == 'ok'){
                    view_data(10, 0, eiin, name);
                } else
                {
                    apprise(result);
                }
            });
        }

    });
}

function news_save(eiin)
{
    var id = document.getElementById("id").value;
    var news = document.getElementById("news").value;
    var status = document.getElementById("status").value;
    $.post("dba.php", {table:'web_news', eiin:eiin, news:news, status:status, id:id}, function (result)
    {
        if (result == 'ok')
        {
            view_data(10, 0, eiin, "news_view");
            document.getElementById("data_form").reset();
            document.getElementById("up_sa").value = "Save";
        } else
        {
            alert(result);
        }
    });

}

function view_data(curr, start, eiin, page)
{
    if (curr != start)
    {
        $.post(page + ".php", {start: start, eiin: eiin}, function (result)
        {
            document.getElementById(page).innerHTML = result;
        });
    } else
    {
        //alert("No More");
        apprise('আর কোন তথ্য নাই!');
    }
}

function find_attendance(eiin)
{
    var date = document.getElementById("find_date").value;
    $.post("attendance_view.php", {date: date, eiin: eiin}, function (result)
    {
        document.getElementById("attendance_view").innerHTML = result;
    });
}

function data_edit(data)
{
    var data1 = data.split('#');
    var len1 = data1.length;
    for (i = 0; i < len1; i++)
    {
        var data2 = data1[i].split('*');
        if (data2[0] == "file_name")
        {
            document.getElementById(data2[0]).innerHTML = data2[1];
        } else
        {
            document.getElementById(data2[0]).value = data2[1];
        }
    }
    document.getElementById("up_sa").value = "Update";
}

function link_save(eiin)
{

    var id = document.getElementById("id").value;
    var title = document.getElementById("title").value;
    var link = document.getElementById("link").value;
    $.post("dba.php", {table:'web_link', eiin:eiin, title:title, link:link, id:id}, function (result)
    {
        if (result == 'ok')
        {
            view_data(10, 0, eiin, "link_view");
            document.getElementById("data_form").reset();
            document.getElementById("up_sa").value = "Save";
        } else
        {
            alert(result);
        }
    });

}
function album_save(eiin)
{
    var id = document.getElementById("id").value;
    var album = document.getElementById("album").value;
    var status = document.getElementById("status").value;
    $.post("dba.php", {table:'web_album', eiin:eiin, id:id, album:album, status:status}, function (result)
    {
        if (result == 'ok')
        {
            view_data(10, 0, eiin, "album_view");
            document.getElementById("data_form").reset();
            document.getElementById("up_sa").value = "Save";
        } else
        {
            alert(result);
        }
    });

}

function download_save(eiin)
{
    var id = document.getElementById("id").value;
    var title = document.getElementById("title").value;
    var file = document.getElementById("file_name").innerHTML;
    if (file == '<img src="../loding.gif">')
    {
        alert("File Uploading");
    } else
    {
        $.post("dba.php", {table:'web_download', eiin:eiin, title:title, file:file, id:id }, function (result)
        {
            if (result == 'ok')
            {
                view_data(10, 0, eiin, "download_view");
                document.getElementById("data_form").reset();
                document.getElementById("up_sa").value = "Save";
            } else
            {
                alert(result);
            }
        });
    }

}




function notice_save(eiin)
{
    var id = document.getElementById("id").value;
    var title = document.getElementById("title").value;
    var file = document.getElementById("file_name").innerHTML;
    if (file == '<img src="../loding.gif">')
    {
        alert("File Uploading");
    } else
    {
        $.post("dba.php", {table:'web_notice', eiin:eiin, id:id, title:title, file:file }, function (result)
        {
            if (result == 'ok')
            {
                view_data(10, 0, eiin, "notice_view");
                document.getElementById("data_form").reset();
                document.getElementById("up_sa").value = "Save";
            } else
            {
                alert(result);
            }
        });
    }

}


function photo_save(eiin)
{
    var id = document.getElementById("id").value;
    var title = document.getElementById("title").value;
    var album_id = document.getElementById("album_id").value;
    var file = document.getElementById("file_name").innerHTML;
    if (file == '<img src="../loding.gif">')
    {
        alert("Photo Uploading");
    } else
    {
        $.post("dba.php", {table:'web_photo', eiin:eiin, id:id, title:title, album_id:album_id, file:file}, function (result)
        {
            if (result == 'ok')
            {
                view_data(10, 0, eiin, "photo_view");
                document.getElementById("data_form").reset();
                document.getElementById("up_sa").value = "Save";
            } else
            {
                alert(result);
            }
        });
    }

}


function slide_save(eiin)
{
    var id = document.getElementById("id").value;
    var title = document.getElementById("title").value;
    var status = document.getElementById("status").value;
    var file = document.getElementById("file_name").innerHTML;
    if (file == '<img src="../loding.gif">')
    {
        alert("Photo Uploading");
    } else
    {
        $.post("dba.php", {table:'web_slide', eiin:eiin, id:id, title:title, status:status, file:file}, function (result)
        {
            if (result == 'ok')
            {
                view_data(10, 0, eiin, "slide_view");
                document.getElementById("data_form").reset();
                document.getElementById("up_sa").value = "Save";
            } else
            {
                alert(result);
            }
        });
    }

}


function class_save(eiin)
{

    var id = document.getElementById("id").value;
    var class_name = document.getElementById("class_name").value;
    var boys = document.getElementById("boys").value;
    var girls = document.getElementById("girls").value;
        $.post("dba.php", {table:'web_class', eiin:eiin, id:id, class_name:class_name, boys:boys, girls:girls}, function (result)
    {
        if (result == 'ok')
        {
            view_data(10, 0, eiin, "class_view");
            document.getElementById("data_form").reset();
            document.getElementById("up_sa").value = "Save";
        } else
        {
            alert(result);
        }
    });
}


function attendance_save(eiin)
{

    var id = document.getElementById("id").value;
    var class_name = document.getElementById("class_name").value;
    var date = document.getElementById("date").value;
    var pre_boys = parseInt(document.getElementById("pre_boys").value);
    var pre_girls = parseInt(document.getElementById("pre_girls").value);
    var find_class = "";
    $.post("find_class.php", {eiin: eiin, class_name: class_name}, function (result)
    {
        var find_class = result.split("*");
        var tot_boys = parseInt(find_class[0]);
        var tot_girls = parseInt(find_class[1]);
        var abs_boys = parseInt(tot_boys) - parseInt(pre_boys)
        var abs_girls = parseInt(tot_girls) - parseInt(pre_girls)
        if (pre_boys > tot_boys || pre_girls > tot_girls)
        {
            alert("Present Student is not correct ");
        } else
        {
            $.post("dba.php", {table:'web_album', eiin:eiin, id:id, class_name:class_name, date:date, pre_boys:pre_boys, pre_girls:pre_girls, abs_boys:abs_boys, abs_girls:abs_girls}, function (result)
            {
                if (result == 'ok')
                {
                    view_data(10, 0, eiin, "attendance_view");
                    document.getElementById("data_form").reset();
                    document.getElementById("up_sa").value = "Save";
                } else
                {
                    alert(result);
                }
            });
        }
    });
}


function submit_form()
{
    document.cms.submit();
}

function submit_menu_form()
{
    document.menu_form.submit();
}


$(window).load(function ()
{
    $('#slider').nivoSlider();
});

function find_download(curr, start, eiin)
{
    if (curr != start)
    {
        $.post(url + "download.php", {start: start, eiin: eiin}, function (result)
        {
            document.getElementById("download").innerHTML = result;
        });
    } else
    {
        alert("No More");
    }
}

function find_notice(curr, start, eiin)
{
    if (curr != start)
    {
        $.post(url + "notice_view.php", {start: start, eiin: eiin}, function (result)
        {
            document.getElementById("notice").innerHTML = result;
        });
    } else
    {
        alert("No More");
    }
}


function find_link(curr, start, eiin)
{
    if (curr != start)
    {
        $.post(url + "link.php", {start: start, eiin: eiin}, function (result)
        {
            document.getElementById("link").innerHTML = result;
        });
    } else
    {
        alert("No More");
    }
}

/*
 $(document).ready(function(){
 $(".photo_big").click(function(){
 
 $(".photo_big").animate({
 //width:'230px'
 width:'335px',
 height:'335px'
 });
 $(this).animate({
 //width:'730px'	  
 width:'700px',
 height:'700px'
 });
 
 //$(".photo_big").attr({height:"1000px"});
 });
 
 });    
 
 */

function bigImg(x)
{

    $(x).animate({
        //width:'230px'
        width: '700px',
        height: '700px'
    });
}

function normalImg(x)
{

    $(x).animate({
        //width:'230px'
        width: '335px',
        height: '335px'
    });

    /*
     x.style.height="335px";
     x.style.width="335px";
     */
}

function institute_list_find(current)
{
    document.getElementById("loding_button").innerHTML = 'Loding';
    var eiin = document.getElementById("eiin").value;
    var institute = document.getElementById("institute").value;
    var zilla = document.getElementById("zilla").value;
    var thana = document.getElementById("thana").value;
    $.post(url + 'institute_list.php', {eiin: eiin, institute: institute, zilla: zilla, thana: thana, action: 'find', current: current}, function (result)
    {
        if (result)
        {
            document.getElementById("institute_list").innerHTML = result;
            document.getElementById("loding_button").innerHTML = 'Find';
        }
    });
}

function show_thana(thana)
{
    thana = thana.toLowerCase();
    $(".all_tha").hide();
    $("." + thana).show();
}

/**
 * JavaScript code to detect available availability of a
 * particular font in a browser using JavaScript and CSS.
 *
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/javascript-css-font-detect/
 * License: Apache Software License 2.0
 *          http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.15 (21 Sep 2009)
 *          Changed comparision font to default from sans-default-default,
 *          as in FF3.0 font of child element didn't fallback
 *          to parent element if the font is missing.
 * Version: 0.2 (04 Mar 2012)
 *          Comparing font against all the 3 generic font families ie,
 *          'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
 *          then that font is 100% not available in the system
 * Version: 0.3 (24 Mar 2012)
 *          Replaced sans with serif in the list of baseFonts
 */

/**
 * Usage: d = new Detector();
 *        d.detect('font name');
 */
var Detector = function () {
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif'];

    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    var testString = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    var testSize = '72px';

    var h = document.getElementsByTagName("body")[0];

    // create a SPAN in the document to get the width of the text we use to test
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }

    function detect(font) {
        var detected = false;
        for (var index in baseFonts) {
            s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
    }

    this.detect = detect;
};



function detect_bang()
{
    var detective = new Detector();
    var mdetect = detective.detect('SolaimanLipi');
    return mdetect;
}