//用于获取WxUser
        getCookieFn(name) {
            var bikky = document.cookie || '';
            name += "=";
            var i = 0;
            debugger;
            while (i < bikky.length)
            {
                var offset = i + name.length;
                if (bikky.substring(i, offset) == name)
                {
                    debugger;
                    var endstr = bikky.indexOf(";", offset);
                    if (endstr == -1) endstr = bikky.length;
                    return unescape(bikky.substring(offset, endstr));
                }
                i = bikky.indexOf(" ", i) + 1;
                if (i == 0) break;
            }
            return null;
        }