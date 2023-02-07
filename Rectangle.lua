---@class Rectangle
Rectangle = {};
Rectangle.__index = Rectangle;

---@param cx number
---@param cy number
---@param width number
---@param height number
---@param radians number
function Rectangle:new(cx, cy, width, height, radians)
    local self = setmetatable({}, Rectangle);
    return self.setData(cx, cy, width, height, radians);
end

---@param cx number
---@param cy number
---@param width number
---@param height number
---@param radians number
---@return Rectangle
function Rectangle:setData(cx, cy, width, height, radians)
    self.cx = cx;
    self.cy = cy;
    self.width = width;
    self.height = height;
    return self.setRadians(radians);
end

---@param cx number
---@param cy number
---@param radians number
---@return Rectangle
function Rectangle:setCenter(cx, cy, radians)
    self.cx = cx;
    self.cy = cy;
    return self.setRadians(radians);
end

---@param width number
---@param height number
---@param radians number
function Rectangle:setSize(width, height, radians)
    self.width = width;
    self.height = height;
    return self.setRadians(radians);
end

---@param radians number
---@return Rectangle
function Rectangle:setRadians(radians)
    local wa = (math.pi - math.atan(self.height / self.width) * 2) * .5;
    local nr, d;
    local hw = self.width * .5;
    local hh = self.height * .5;
    local hp = math.pi * .5;

    self.diagonal = math.sqrt(self.width ^ 2 + self.height ^ 2);
    d = self.diagonal * .5;

    self.radians = radians - 2 * math.pi * R2I(radians / (math.pi * 2));

    self.tx = self.cx + hh * math.cos(self.radians);
    self.ty = self.cy + hh * math.sin(self.radians);

    nr = radians + hp;
    self.lx = self.cx + hw * math.cos(nr);
    self.ly = self.cy + hw * math.sin(nr);

    nr = radians - hp;
    self.rx = self.cx + hw * math.cos(nr);
    self.ry = self.cy + hw * math.sin(nr);

    nr = radians - wa;
    self.trx = self.cx + d * math.cos(nr);
    self.try = self.cy + d * math.sin(nr);

    nr = radians + wa;
    self.tlx = self.cx + d * math.cos(nr);
    self.tly = self.cy + d * math.sin(nr);

    radians = radians + math.pi;
    self.bx = self.cx + hh * math.cos(radians);
    self.by = self.cy + hh * math.sin(radians);

    nr = radians - wa;
    self.blx = self.cx + d * math.cos(nr);
    self.bly = self.cy + d * math.sin(nr);

    nr = radians + wa;
    self.brx = self.cx + d * math.cos(nr);
    self.bry = self.cy + d * math.sin(nr);

    return self;
end

---@param dx number
---@param dy number
---@return Rectangle
function Rectangle:translateOffset(dx, dy)
    self.cx = self.cx + dx;
    self.cy = self.cy + dy;

    self.tx = self.tx + dx;
    self.ty = self.ty + dy;
    self.lx = self.lx + dx;
    self.ly = self.ly + dy;
    self.rx = self.rx + dx;
    self.ry = self.ry + dy;
    self.bx = self.bx + dx;
    self.by = self.by + dy;

    self.tlx = self.tlx + dx;
    self.tly = self.tly + dy;
    self.trx = self.trx + dx;
    self.try = self.try + dy;
    self.blx = self.blx + dx;
    self.bly = self.bly + dy;
    self.brx = self.brx + dx;
    self.bry = self.bry + dy;

    return self;
end

---@param distance number
---@param radians number
---@return Rectangle
function Rectangle:translatePolar(distance, radians)
    local x = self.cx + distance * math.cos(radians);
    local y = self.cy + distance * math.sin(radians);
    return self.translateOffset(x - self.cx, y - self.cy);
end



--[[

            method rotate(real ox, real oy, real radians) -> thistype {
                real cos = math.cos(radians);
                real sin = math.sin(radians);
                real xn, yn;

                cx -= ox;
                cy -= oy;
                xn = cx * cos - cy * sin;
                yn = cx * sin + cy * cos;
                cx = xn + rx;
                cy = yn + ry;

                return setRadians(self.radians + radians);
            }

            method distanceXY(real x, real y) -> real {
                real a = 0 - radians;
                real cos = math.cos(a);
                real sin = math.sin(a);
                real xn, yn, dx , dy, d;
                real hh = height * .5;
                real hw = width * .5;
                real xmin = cx - hh;
                real xmax = cx + hh;
                real ymin = cy - hw;
                real ymax = cy + hw;

                x = x - cx;
                y = y - cy;
                xn = x * cos - y * sin;
                yn = x * sin + y * cos;
                x = xn + cx;
                y = yn + cy;

                dx = RMaxBJ(0, RMaxBJ(xmin - x, x - xmax));
                dy = RMaxBJ(0, RMaxBJ(ymin - y, y - ymax));

                d = dx * dx + dy * dy;
                if (d > 0) {
                    return 0 - d;
                }
                d = RMinBJ(x - xmin, RMinBJ(xmax - x, RMinBJ(y - ymin, ymax - y)));
                return d * d;
            }
        }
    }
--]]
