using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Web;

namespace MHatka.Models.SaveImage
{
    public class Utils
    {
        public static Bitmap CreateImage(Bitmap originalPic, int maxWidth, int maxHeight)
        {
            //Перевірка існування файла

            // Вычисление новых размеров картинки
            int width = originalPic.Width; //текущая ширина
            int height = originalPic.Height; //текущая высота
            int widthDiff = (width - maxWidth); //разница с допуст. шириной
            int heightDiff = (height - maxHeight); //разница с допуст. высотой
                                                   // Определение размеров, которые необходимо изменять
            bool doWidthResize = (maxWidth > 0 && width > maxWidth &&
                                widthDiff > -1 && widthDiff > heightDiff);
            bool doHeightResize = (maxHeight > 0 && height > maxHeight &&
                                heightDiff > -1 && heightDiff > widthDiff);
            // Ресайз картинки
            if (doWidthResize || doHeightResize || (width.Equals(height)
                            && widthDiff.Equals(heightDiff)))
            {
                int iStart;
                Decimal divider;
                if (doWidthResize)
                {
                    iStart = width;
                    divider = Math.Abs((Decimal)iStart / maxWidth);
                    width = maxWidth;
                    height = (int)Math.Round((height / divider));
                }
                else
                {
                    iStart = height;
                    divider = Math.Abs((Decimal)iStart / maxHeight);
                    height = maxHeight;
                    width = (int)Math.Round((width / divider));
                }
            }
            //Використання интерполяции
            using (System.Drawing.Bitmap outBmp = new System.Drawing.Bitmap(width, height, PixelFormat.Format16bppRgb555))
            {
                using (System.Drawing.Graphics oGraphics = System.Drawing.Graphics.FromImage(outBmp))
                {
                    oGraphics.DrawImage(originalPic, 0, 0, width, height);
                    return new Bitmap(outBmp);
                }
            }
        }
    }
}