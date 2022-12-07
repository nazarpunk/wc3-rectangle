Rectange
=

<p align="center">
<a href="https://xgm.guru/p/wc3/rectangle">XGN</a>
| 
<a href="https://nazarpunk.github.io/wc3-zinc-rectangle">WebDemo</a>
</p>

<p align="center">
<img src="https://xgm.guru/files/100/294549/rectangle_.png" alt="">
</p>

Что это?
==
По давней традиции в играх используются прямоугольники ориентированные по осям. Это упрощает математику и не заставляет хорошо учиться в школе. Но что если --вы не такой как все-- вам нужен прямоугольник со свободным углом вращения?

Как пользоваться?
==
Это структура. Поэтому достаточно её создать. Так же, можно воспользоваться особенностью структур и сразу вызывать её методы --без смс и регистрации--.
```
Rectangle r = Rectangle.create(centerX, centerY, width, height, radians).translatePolar(200,radians);
```

<p align="center">
<img src="https://xgm.guru/files/100/294549/grid.png" alt="">
</p>

В чём соль?
==
Затевалась вся эта затея ради функции **distanceSquaredXY** которая возвращает квадрат расстояния от заданной точки до ближайшей точки прямоугольника. Что позволяет проверить наличие юнита в прямоугольнике с учётом коллизии.

```
Rectangle r = Rectangle.create(centerX, centerY, width, height, radians);

GroupEnumUnitsInRange(g, r.cx, r.cy, r.diagonal * .5 + 200, Filter(function() -> boolean {
return UnitAlive(GetFilterUnit());
}));

while(true) {
t = FirstOfGroup(g);
if (t == null) {
break;
}
tx = GetUnitX(t);
ty = GetUnitY(t);

    if (IsUnitInRangeXY(t, tx, ty + SquareRoot(r.distanceSquaredXY(tx, ty)),0)) {
        KillUnit(t);
    }
}
```

Методы
==
```
method setData(real cx, real cy, real width, real height, real radians) -> Rectangle
```
```
method setCenter(real cx, real cy, real radians) -> Rectangle
```
```
method setSize(real width, real height, real radians) -> Rectangle
```
```
method setRadians(real radians) -> Rectangle
```
```
method translateOffset(real dx, real dy) -> Rectangle
```
```
method translatePolar(real distance, real radians) -> Rectangle
```
```
method rotate(real ox, real oy, real radians) -> Rectangle
```
**rotate** поворачивает прямоугольник на заданный угол вокруг заданной точки.

```
method distanceSquaredXY(real x, real y) -> real
```
**distanceSquaredXY** возвращает квадрат кратчайшего расстояния между произвольной точкой и ближайшей точкой прямоугольника.
