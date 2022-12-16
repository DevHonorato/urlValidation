import { Component, OnInit } from '@angular/core';
import { Return } from './class/Return';
import { Sort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { SearchPipe } from './service/search.pipe';
import { ConnectionCheckService } from './service/connection-check.service';
import { NotificationService } from './service/notification.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'fetchUrlValidation';
  arrayBuffer: any;
  file!: File;
  result: any[] = [];
  pag = 1;
  contador = 5;
  total = 0;

  totalizador = 0;

  start = false;
  startBtn = false;

  sucesso = 0;
  erro = 0;
  falha = 0;

  pesquisa="";
  pesquisaLength = 0;
  fileName = 'Result.xlsx';

  status: any = "Online";
  fixStatus: any = 1;

  constructor(private search: SearchPipe, private connectionCheckService: ConnectionCheckService, private notificacaoService: NotificationService,){

    const checkOnlineStatus = async () => {
      try {
        const online = this.connectionCheckService;
        return online.hasConnection; // either true or false
      } catch (err) {
        return false; // definitely offline
      }};

    setInterval(async () => {
      const result = await checkOnlineStatus();
      if(this.status != result){
        this.status = result;
        this.fixStatus = 2;
      }
    }, 500); // probably too often, try 30000 for every 30 seconds

  }

  OnInit(): void{


  }

  ImportXlsx2() {

    this.start = true;
    this.startBtn = true;
    this.sucesso = 0;
    this.erro = 0;
    this.falha = 0;
    this.result = [];

    let fileReader = new FileReader();
    fileReader.onload = async (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary",  dateNF:'dd/mm/yyyy'});

        let countIndex = 0;
        var first_sheet_name = "";
        let verificacao = false;

        while (!verificacao) {

          first_sheet_name = workbook.SheetNames[countIndex];
          if(first_sheet_name.toLowerCase().trim() == "url"){
            verificacao = true;
          }

          countIndex++;
        }

        var worksheet = workbook.Sheets[first_sheet_name];
        var excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        var worksheetJson = XLSX.utils.sheet_to_json(worksheet,{raw:false});
        // console.log(worksheetJson)
        this.totalizador = 0;
        this.totalizador = worksheetJson.length;

        this.total = 0;
        let count = 100/(worksheetJson.length);
        // console.log(count);

        for (let index = 0; index < worksheetJson.length; index++) {
          const element: any = worksheetJson[index];

          const url = element.URL.replace(/\(/g, '%28').replace(/\)/g, '%29');

          let type = "";

          if(url.includes(".jpg")){
            type = "image/jpg"
          }else if(url.includes(".jpeg")){
            type = "image/jpeg"
          }else if(url.includes(".png")){
            type = "image/png"
          }else if(url.includes(".gif")){
            type = "image/gif"
          }else{
            type = "blob"
          }

          const urlEdit = url.toString();
          const splitUrl = urlEdit.split("/");
          let nomeFinal = splitUrl[splitUrl.length - 1];

          const returns = new Return();
          const fetchs = await fetch(url)
          .then(response => response)
          .then(async (response) => {
            if (response.ok) {
              const urlToFile = await fetch(url) .then(function (res) { return res.arrayBuffer(); }) .then(function (buf) { return new File([buf], nomeFinal.replace(/\s+/g, '_'), { type: type }); })
              const size = this.sizeFile(urlToFile.size);
              returns.id = index+1;
              returns.status = response.status;
              returns.statusText = response.statusText;
              returns.type = response.type;
              returns.url = response.url;
              returns.size = size;
              this.result.push(returns)
              this.total += count;
              this.sucesso++
            } else {
              const urlToFile = await fetch(url) .then(function (res) { return res.arrayBuffer(); }) .then(function (buf) { return new File([buf], nomeFinal.replace(/\s+/g, '_'), { type: type }); })
              const size = this.sizeFile(urlToFile.size);
              returns.id = index+1;
              returns.status = response.status;
              returns.statusText = response.statusText;
              returns.type = response.type;
              returns.url = response.url;
              returns.size = size;
              this.result.push(returns)
              this.total += count;
              this.falha++
            }
          })
          .catch(error => {
            returns.id = index+1;
            returns.status = null;
            returns.statusText = 'Error';
            returns.type = null;
            returns.url = url;
            returns.size = null;
            this.result.push(returns)
            this.total += count;
            this.erro++
          });
        }
    }

    try {
      fileReader.readAsArrayBuffer(this.file);
    } catch (error) {

    }

    let tm = setInterval(() => {
      if(this.totalizador == this.result.length && this.totalizador != 0){
        clearInterval(tm);
        this.total = 100;
        this.startBtn = false;
      }
    }, 100)
  }

  incomingfile(event: any)
  {
  this.file= event.target.files[0];
  }

  pags(pags: any) {
    const target = pags as HTMLTextAreaElement;
    this.contador = parseInt(target.value)
  }

  handlePageChange(event: any) {
    this.pag = event;
  }

  sortData(sort: Sort) {
    const data = this.result.slice();
    if (!sort.active || sort.direction === '') {
      this.result = data;
      return;
    }

    this.result = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'statusText':
          return compare(a.statusText, b.statusText, isAsc);
        case 'type':
          return compare(a.type, b.type, isAsc);
        case 'url':
          return compare(a.url, b.url, isAsc);
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'size':
          return compare(a.size, b.size, isAsc);
        default:
          return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

  sizeFile(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  filtroRetornoTS(){
    const ts = this.search.transform(this.result, this.pesquisa);
    if(this.pesquisa == ""){
      this.pesquisaLength = 0;
    }else{
      this.pesquisaLength = ts.length;
    }
  }

  exportexcel(){
    let novaOrdem = [{}];
    Object.keys(this.result).sort((a, b) => {
      return a.localeCompare(b);
    }).forEach((key: any) => {
      novaOrdem[key] = this.result[key];
    });
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(novaOrdem);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Resul');
    XLSX.writeFile(wb, this.fileName);
  }
}
