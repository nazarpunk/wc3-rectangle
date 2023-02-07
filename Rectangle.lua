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
    self.radians = radians - 2 * math.pi * math.floor(radians / (math.pi * 2));
    self.diagonal = math.sqrt(self.width ^ 2 + self.height ^ 2);

    local wa = (math.pi - math.atan(self.height / self.width) * 2) * .5;
    local hw = self.width * .5;
    local hh = self.height * .5;
    local hp = math.pi * .5;
    local d = self.diagonal * .5;

    self.tx = self.cx + hh * math.cos(self.radians);
    self.ty = self.cy + hh * math.sin(self.radians);

    local nr = radians + hp;
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

---rotate
---@param ox number
---@param oy number
---@param radians number
---@return Rectangle
function Rectangle:rotate(ox, oy, radians)
    local cos = math.cos(radians);
    local sin = math.sin(radians);

    self.cx = self.cx - ox;
    self.cy = self.cy - oy;
    local xn = self.cx * cos - self.cy * sin;
    local yn = self.cx * sin + self.cy * cos;
    self.cx = xn + self.rx;
    self.cy = yn + self.ry;

    return self.setRadians(self.radians + radians);
end

function Rectangle:distanceXY(x, y)
    local a = -self.radians;
    local cos = math.cos(a);
    local sin = math.sin(a);
    local hh = self.height * .5;
    local hw = self.width * .5;
    local xmin = self.cx - hh;
    local xmax = self.cx + hh;
    local ymin = self.cy - hw;
    local ymax = self.cy + hw;

    x = x - self.cx;
    y = y - self.cy;
    local xn = x * cos - y * sin;
    local yn = x * sin + y * cos;
    x = xn + self.cx;
    y = yn + self.cy;

    local dx = math.max(0, math.max(xmin - x, x - xmax));
    local dy = math.max(0, math.max(ymin - y, y - ymax));

    local d = dx * dx + dy * dy;
    if d > 0 then
        return -d;
    end
    return math.min(x - xmin, xmax - x, y - ymin, ymax - y) ^ 2;
end
