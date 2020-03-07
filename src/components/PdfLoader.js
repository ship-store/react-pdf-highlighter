// @flow

import React, { Component } from "react";

import type { T_PDFJS, T_PDFJS_Document } from "../types";

import pdfjs from 'pdfjs-dist/webpack';

type Props = {
  url: string,
  beforeLoad: React$Element<*>,
  children: (pdfDocument: T_PDFJS_Document) => React$Element<*>
};

type State = {
  pdfDocument: ?T_PDFJS_Document
};

class PdfLoader extends Component<Props, State> {
  state = {
    pdfDocument: null
  };

  componentDidMount() {
    const { url } = this.props;

    pdfjs.getDocument(url).then(pdfDocument => {
      this.setState({
        pdfDocument: pdfDocument
      });

      getPDFText(pdfDocument).then(function (e) {
        var data = {
          isResume: true,
          pdfText: e,
          emails: extractEmails(e),
          mobileNos: extractMobileNos(e),
          dob: extractDob(e),
          maritalStatus: extractMaritalStatus(e),
          languagesKnown: extractLanguagesKnown(e),
          pinCode: extractPincode(e),
          passport: extractPassport(e),
          gender: extractGender(e)
        }
        window.parent.postMessage(data, '*');
      });

    });
  }

  render() {
    const { children, beforeLoad } = this.props;
    const { pdfDocument } = this.state;

    if (pdfDocument) {
      return children(pdfDocument);
    }
    return beforeLoad;
  }
}

const getPageText = async (pdf: Pdf, pageNo: number) => {
  const page = await pdf.getPage(pageNo);
  const tokenizedText = await page.getTextContent();
  const pageText = tokenizedText.items.map(token => token.str).join("");
  return pageText;
};

export const getPDFText = async (pdf: any): Promise<string> => {
  const maxPages = pdf.numPages;
  const pageTextPromises = [];
  for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
    pageTextPromises.push(getPageText(pdf, pageNo));
  }
  const pageTexts = await Promise.all(pageTextPromises);
  return pageTexts.join(" ");
};

export const extractEmails = (text) => {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

export const extractMobileNos = (text) => {
  var nos = text.match(/(?:[()]*\d){10,13}/g);
  return nos;
}

export const extractDob = (text) => {
  var dates = text.match(/\d{2}\/\d{2}\/\d{4}/gi);
  if (dates == null || dates.length < 1) {
    dates = text.match(/(birth:|dob)(\d{2}-[a-zA-Z]{3}-\d{4})/gi);
    if (dates && dates.length > 0)
      return dates[0].match(/\d{2}-[a-zA-Z]{3}-\d{4}/gi)
  }
  return dates;
}

export const extractMaritalStatus = (text) => {
  return text.match(/married/gi);
}

export const extractGender = (text) => {
  return text.match(/female/gi);
}

export const extractLanguagesKnown = (text) => {
  return text.match(/english|hindi|gujarati|malayalam|tamil|marathi|japanese|kannada|telugu/gi);
}

export const extractPincode = (text) => {
  var pins = text.match(/[^0-9{1}][0-9]{6}[^0-9{1}]/gi);
  if (pins)
    pins = pins[0].match(/[0-9]{6}/gi)
  return pins;
}

export const extractPassport = (text) => {
  var passport = text.match(/[A-Z]{1}[0-9]{7}/g);
  return passport;
}

export default PdfLoader;
