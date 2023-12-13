import React from "react";
import {
  FaMapMarker,
  FaEnvelope,
  FaPhone,
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaGooglePlus,
} from "react-icons/fa";
import { Logo, FooterImg } from "../../assets";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer
      className="relative bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${FooterImg})`,
      }}>
      <div className="z-[1] container mx-auto relative pt-14 px-4 md:px-0">
        <div className="flex text-white text-base font-normal flex-wrap md:flex-nowrap md:flex-row">
          <div className="hidden md:flex flex-col items-center justify-start h-max w-[24%]">
            <img src={Logo} alt="" />
            <span className="text-[#d3b673] font-bold text-base text-[40px]">
              DoraTea
            </span>
          </div>
          <div className="w-full md:w-[40%] md:pl-7">
            <div className="text-[#d3b673] mb-1 md:mb-[30px] font-bold text-lg uppercase">
              Công ty CP TM &amp; Dv Dora Việt Nam
            </div>
            <div className="mb-[10px] flex items-center">
              <FaMapMarker
                className="text-[#d3b673] mr-[10px] text-base"
                aria-hidden="true"
              />
              <span>
                Tầng 2 tòa nhà T10, Times City Vĩnh Tuy, Hai Bà Trưng, Hà Nội.
              </span>
            </div>
            <div className="mb-[10px] flex items-center">
              <FaPhone
                className="text-[#d3b673] mr-[10px] text-base"
                aria-hidden="true"
              />
              1900.63.69.36
            </div>
            <div className="mb-[10px] flex items-center">
              <FaEnvelope
                className="text-[#d3b673] mr-[10px] text-base"
                aria-hidden="true"
              />
              info@doratea.com
            </div>
            <div className="mb-[10px] flex items-center">
              Số ĐKKD: 0106341306. Ngày cấp: 16/10/2023.
            </div>
            <div className="mb-[10px] flex items-center">
              Nơi cấp: Sở kế hoạch và Đầu tư Thành phố Hà Nội.
            </div>
            <div className="mb-[20px] flex items-center gap-x-5">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/tocotocobubbletea/">
                <FaFacebookSquare
                  className="text-[#d3b673]  text-lg"
                  aria-hidden="true"
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/tocotoco_bubble_tea/">
                <FaInstagram
                  className="text-[#d3b673] text-lg"
                  aria-hidden="true"
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/c/ToCoToCoBubbleTea">
                <FaYoutube
                  className="text-[#d3b673] text-lg"
                  aria-hidden="true"
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.tiktok.com/@tocotocobubbletea/">
                <FaTwitter
                  className="text-[#d3b673]  text-lg"
                  aria-hidden="true"
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://zalo.me/2268915497539367639">
                <FaGooglePlus
                  className="text-[#d3b673]  text-lg"
                  aria-hidden="true"
                />
              </a>
            </div>
            <div className="mb-[10px] flex items-center w-full md:w-[65%] flex-wrap justify-between">
              <a
                className=" w-[30%] md:w-[48%] mb-2"
                target="_blank"
                rel="noreferrer"
                href="https://play.google.com/store/apps/details?id=com.ipos.tocotoco">
                <img
                  className="w-full"
                  src="https://tocotocotea.com/wp-content/themes/tocotocotea/assets/images/Googleplay.png"
                  alt=""
                />
              </a>
              <a
                className=" w-[30%] md:w-[48%] mb-2"
                target="_blank"
                rel="noreferrer"
                href="https://apps.apple.com/vn/app/tocotoco/id1249910346">
                <img
                  className="w-full"
                  src="https://tocotocotea.com/wp-content/themes/tocotocotea/assets/images/Appstore.png"
                  alt=""
                />
              </a>
              <a
                className=" w-[30%] md:w-[48%] mb-2"
                target="_blank"
                rel="noreferrer"
                href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=57603">
                <img
                  className="w-full"
                  src="https://tocotocotea.com/wp-content/themes/tocotocotea/assets/images/bo_cong_thuong_grande.png"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="w-[50%] md:pl-7 md:w-[18%]">
            <div className="text-[#d3b673] mb-1 md:mb-[30px] font-bold text-lg uppercase">
              Về chúng tôi
            </div>
            <div>
              <div>
                <ul
                  id="menu-footer-ve-chung-toi"
                  className="flex flex-col gap-y-2">
                  <li id="menu-item-1319">
                    <Link to="/news">Giới thiệu về DoraTea</Link>
                  </li>
                  <li id="menu-item-1320">
                    <Link to="/news">Nhượng quyền</Link>
                  </li>
                  <li id="menu-item-2119">
                    <Link to="/news/tin-tuc-khuyen-mai">
                      Tin tức khuyến mại
                    </Link>
                  </li>
                  <li id="menu-item-1865">
                    <Link to="/news">Quy định chung</Link>
                  </li>
                  <li id="menu-item-1866">
                    <Link to="/about">TT liên hệ &amp; ĐKKD</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-[50%] md:pl-7 md:w-[18%] mb-2">
            <div className="text-[#d3b673] mb-1 md:mb-[30px] font-bold text-lg uppercase">
              Chính sách
            </div>
            <div>
              <div>
                <ul
                  id="menu-footer-chinh-sach"
                  className="flex flex-col gap-y-2">
                  <li id="menu-item-1313">
                    <Link to="/chinh-sach/dieu-khoan-chinh-sach-thanh-vien-than-thiet-tocotococlub/">
                      Chính sách thành viên
                    </Link>
                  </li>
                  <li id="menu-item-1314">
                    <Link to="/chinh-sach/quy-dinh-va-hinh-thuc-thanh-toan/">
                      Hình thức thanh toán
                    </Link>
                  </li>
                  <li id="menu-item-1315">
                    <Link to="/chinh-sach/chinh-sach-van-chuyen-giao-nhan/">
                      Vận chuyển giao nhận
                    </Link>
                  </li>
                  <li id="menu-item-1316">
                    <Link to="/chinh-sach/chinh-sach-doi-tra-hang-va-hoan-tien/">
                      Đổi trả và hoàn tiền
                    </Link>
                  </li>
                  <li id="menu-item-1317">
                    <Link to="/chinh-sach/chinh-sach-bao-ve-thong-tin-ca-nhan-cua-nguoi-tieu-dung/">
                      Bảo vệ thông tin cá nhân
                    </Link>
                  </li>
                  <li id="menu-item-1318">
                    <Link to="/chinh-sach/chinh-sach-bao-hanh-bao-tri/">
                      Bảo trì, bảo hành
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white flex justify-between text-white py-2 md:py-0">
          <div className="hidden md:block text-center my-5 mx-1 font-bold text-base">
            DoraTea - Thương hiệu trà sữa tiên phong sử dụng nguồn nông sản Việt
            Nam
          </div>
          <div className="flex items-center font-normal text-sm">
            Copyrights © 2023 by DoraTea. All rights reserved.
          </div>
        </div>
      </div>
      <div className="absolute w-full h-full top-0 right-0 left-0 bottom-0 z-0 bg-footerColor" />
    </footer>
  );
}
