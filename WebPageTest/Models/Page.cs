using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace WebPageTest.Models
{
    public class Page
    {
        public string Url { get; set; }

        public string Location { get; set; }

        public string Browser { get; set; }

        public string Connectivity { get; set; }

        public string runs { get; set; }

        public string DownloadBandwidth { get; set; }

        public string UploadBandwidth { get; set; }

        public string Latency { get; set; }

        public int ReapeatView { get; set; }

        public int isMobile { get; set; }

        public string FormatConnectivity()
        {
            return $"{Location}:{Browser}.{Connectivity}";
        }
    }
}