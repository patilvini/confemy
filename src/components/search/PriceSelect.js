import BackIcon from "../icons/BackIcon";
import Select from "react-select";
import { useState } from "react";

const options = [
  { value: "AED", label: "Arabic Dirham" },
  { value: "AFN", label: "Afghani" },
  { value: "ALL", label: "Lek" },
  { value: "AMD", label: "Dram" },
  { value: "ANG", label: "Netherlands Antillean Guilder" },
  { value: "AOA", label: "Kwanza" },
  { value: "ARS", label: "Argentine Peso" },
  { value: "AUD", label: "Australian Dollar" },
  { value: "AWG", label: "Guilder" },
  { value: "AZN", label: "Manat" },
  { value: "BAM", label: "Convertible Mark" },
  { value: "BBD", label: "Barbadian Dollar" },
  { value: "BDT", label: "Taka" },
  { value: "BGN", label: "Bulgarian Lev" },
  { value: "BHD", label: "Bahrain Dinar" },
  { value: "BIF", label: "Burundi Franc" },
  { value: "BMD", label: "Bermudian Dollar" },
  { value: "BND", label: "Brunei Dollar" },
  { value: "BOB", label: "Boliviano" },
  { value: "BRL", label: "Real" },
  { value: "BSD", label: "Bahamian Dollar" },
  { value: "BTN", label: "Ngultrum" },
  { value: "BWP", label: "Pula" },
  { value: "BYR", label: "Belarus Rubel" },
  { value: "BZD", label: "Belize Dollar" },
  { value: "CAD", label: "Canadian Dollar" },
  { value: "CDF", label: "Congolais Franc" },
  { value: "CHF", label: "Swiss Franc" },
  { value: "CKD", label: "Cook Dollar" },
  { value: "CLP", label: "Chilean Peso" },
  { value: "CNY", label: "Renminbi Yuan" },
  { value: "COP", label: "Colombian Peso" },
  { value: "CRC", label: "Colón" },
  { value: "CUP", label: "Cuban Peso" },
  { value: "CVE", label: "Cape Verdean Escudo" },
  { value: "CZK", label: "Czech Krone" },
  { value: "DJF", label: "Djibouti Franc" },
  { value: "DKK", label: "Danish Krone" },
  { value: "DOP", label: "Dominican Peso" },
  { value: "DZD", label: "Algerian Dinar" },
  { value: "EGP", label: "Egypt Pound" },
  { value: "ERN", label: "Nakfa" },
  { value: "ETB", label: "Birr" },
  { value: "EUR", label: "Euro" },
  { value: "FJD", label: "Fidschi Dollar" },
  { value: "FKP", label: "Falklands Pound" },
  { value: "FOK", label: "Faroese Krona" },
  { value: "GBP", label: "Sterling Pound" },
  { value: "GEL", label: "Georgian Lari" },
  { value: "GGP", label: "Guernsey Pound" },
  { value: "GHS", label: "Ghana Cedi" },
  { value: "GIP", label: "Gibraltar Pound" },
  { value: "GMD", label: "Dalasi" },
  { value: "GNF", label: "Guinea Franc" },
  { value: "GTQ", label: "Quetzal" },
  { value: "GYD", label: "Guyana Dollar" },
  { value: "HKD", label: "Hong Kong Dollar" },
  { value: "HNL", label: "Lempira" },
  { value: "HRK", label: "Kuna" },
  { value: "HTG", label: "Gourde" },
  { value: "HUF", label: "Hungarian Forint" },
  { value: "IDR", label: "Indonesian Rupiah" },
  { value: "ILS", label: "Israeli Shekel" },
  { value: "IMP", label: "Manx Pound" },
  { value: "INR", label: "Indian Rupee" },
  { value: "IQD", label: "Iraqi Dinar" },
  { value: "IRR", label: "Iranian Rial" },
  { value: "ISK", label: "Icelandic Krone" },
  { value: "JEP", label: "Jersey Sterling Pound" },
  { value: "JMD", label: "Jamaica Dollar" },
  { value: "JOD", label: "Jordanian Dinar" },
  { value: "JPY", label: "Japanese Yen" },
  { value: "KES", label: "Kenian Schilling" },
  { value: "KGS", label: "Som" },
  { value: "KHR", label: "Cambodian Riel" },
  { value: "KID", label: "Kiribati Dollar" },
  { value: "KMF", label: "Comorian Franc" },
  { value: "KPW", label: "Won" },
  { value: "KRW", label: "Won" },
  { value: "KWD", label: "Kuwaiti Dinar" },
  { value: "KYD", label: "Cayman Dollar" },
  { value: "KZT", label: "Tenge" },
  { value: "LAK", label: "Kip" },
  { value: "LBP", label: "Lebanese Pound" },
  { value: "LKR", label: "Sri Lanka Rupee" },
  { value: "LRD", label: "Liberian Dollar" },
  { value: "LSL", label: "Lesotho Loti" },
  { value: "LYD", label: "Libyan Dinar" },
  { value: "MAD", label: "Moroccan Dirham" },
  { value: "MDL", label: "Leu" },
  { value: "MGA", label: "Malagasy Ariary" },
  { value: "MKD", label: "Denar" },
  { value: "MMK", label: "Kyat" },
  { value: "MNT", label: "Tugrik" },
  { value: "MOP", label: "Macanese Pataca" },
  { value: "MRO", label: "Ouguiya" },
  { value: "MUR", label: "Mauritian Rupee" },
  { value: "MVR", label: "Maldivian Rufiyaa" },
  { value: "MWK", label: "Kwacha" },
  { value: "MXN", label: "Mexican Peso" },
  { value: "MYR", label: "Ringgit" },
  { value: "MZN", label: "Metical" },
  { value: "NAD", label: "Namibian Dollar" },
  { value: "NGN", label: "Naira" },
  { value: "NIO", label: "Córdoba Oro" },
  { value: "NOK", label: "Norwegian Krone" },
  { value: "NPR", label: "Nepalese Rupee" },
  { value: "NZD", label: "New Zealand Dollar" },
  { value: "OMR", label: "Omani Rial" },
  { value: "PAB", label: "Panamanian Balboa" },
  { value: "PEN", label: "Nuevo Sol" },
  { value: "PGK", label: "Kina" },
  { value: "PHP", label: "Philippine Peso" },
  { value: "PKR", label: "Pakistanian Rupee" },
  { value: "PLN", label: "Zloty" },
  { value: "PYG", label: "Guaraní" },
  { value: "QAR", label: "Qatari Rial" },
  { value: "RON", label: "Leu" },
  { value: "RSD", label: "Serbian Dinar" },
  { value: "RUB", label: "Russian Rubel" },
  { value: "RWF", label: "Rwandan Franc" },
  { value: "SAR", label: "Saudi Rial" },
  { value: "SBD", label: "Salomon Dollar" },
  { value: "SCR", label: "Seychelles Rupee" },
  { value: "SDG", label: "Sudanese Pound" },
  { value: "SEK", label: "Swedish Krone" },
  { value: "SGD", label: "Singapore Dollar" },
  { value: "SHP", label: "St.-Helena Pound" },
  { value: "SLL", label: "Leone" },
  { value: "SOS", label: "Somalian Shilling" },
  { value: "SRD", label: "Surinam Dollar" },
  { value: "SSP", label: "South Sudanese Pound" },
  { value: "STD", label: "Dobra" },
  { value: "SYP", label: "Syrian Pound" },
  { value: "SZL", label: "Swazi Lilangeni" },
  { value: "THB", label: "Thai Baht" },
  { value: "TJS", label: "Somoni" },
  { value: "TMT", label: "Manat" },
  { value: "TND", label: "Tunesian Dinar" },
  { value: "TOP", label: "Pa'anga" },
  { value: "TRY", label: "Turkish Lira" },
  { value: "TTD", label: "Trinidad and Tobago Dollar" },
  { value: "TVD", label: "Tuvaluan Dollar" },
  { value: "TWD", label: "New Taiwan Dollar" },
  { value: "TZS", label: "Tansanian Shilling" },
  { value: "UAH", label: "Hrywnja" },
  { value: "UGX", label: "Ugandan Schilling" },
  { value: "USD", label: "US Dollar" },
  { value: "UYU", label: "Uruguay Peso" },
  { value: "UZS", label: "Uzbekistan Sum" },
  { value: "VEF", label: "Bolívar fuerte" },
  { value: "VND", label: "Dong" },
  { value: "VUV", label: "Vatu" },
  { value: "WST", label: "Tala" },
  { value: "XAF", label: "Central African Franctied to: Euro" },
  { value: "XCD", label: "East Caribbean Dollar" },
  { value: "XOF", label: "West African Franctied to: Euro" },
  { value: "XPF", label: "Pacific Franctied to: Euro" },
  { value: "YER", label: "Jemen Rial" },
  { value: "ZAR", label: "South African Rand" },
  { value: "ZMW", label: "Zambian Kwacha" },
  { value: "ZWL", label: "Zimbabwe Dollar" },
];

export default function PriceSelect({ close, setValue }) {


    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [currency, setCurrency] = useState();

  return (
    <div className="filter-component">
      <button onClick={close} className="filter-back-button">
        <BackIcon fill="#757575" className="filter-icon" />
        Filters
      </button>
      <h3 className="component-title">Price</h3>

      <h4 className="component-label">Pick a Currency</h4>

      <Select
        options={options}
        className="select-input"
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#4cb944",
            primary: "#08415c",
          },
        })}
        onChange={(e)=>setCurrency(e)}
      />

      <h4 className="component-label">Min. Price</h4>

      <input
        onChange={(e) =>
          setMin(e.target.value)
        }
        className="date-input"
        type="number"
      />

      <h4 className="component-label">Max. Price</h4>
      <input
        onChange={(e) =>
          setMax(e.target.value)
        }
        className="date-input"
        type="number"
      />
      <button onClick={()=>{
        const values = {
            label: currency.value + ", " + min + " - " + max,
            value: {currency: currency, min: min, max: max}
        }

        // console.log(currency, min, max)

        setValue(values)

      }} className="button button-green">Set</button>
    </div>
  );
}
