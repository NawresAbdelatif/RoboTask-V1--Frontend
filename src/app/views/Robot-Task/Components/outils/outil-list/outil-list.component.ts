import { Component, OnInit } from '@angular/core';
import {RobotTaskService} from "../../../Services/robot-task.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PageEvent} from "@angular/material/paginator";
import {ImagePreviewDialogComponent} from "../../shared/image-preview-dialog/image-preview-dialog.component";
import {BadgeLegendDialogComponent} from "../../pieces/piece-list/badge-legend-dialog/badge-legend-dialog.component";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { saveAs } from 'file-saver';
import autoTable from "jspdf-autotable";
import {Outil} from "../../../Models/outil.model";
import {OutilDialogComponent} from "../outil-dialog/outil-dialog.component";

@Component({
  selector: 'app-outil-list',
  templateUrl: './outil-list.component.html',
  styleUrls: ['./outil-list.component.scss']
})
export class OutilListComponent implements OnInit {

  outils: Outil[] = [];
  page = 0;
  size = 5;
  totalItems = 0;
  totalPages = 0;
  totalElements = 0;
  loading = false;
  search = '';
  isMobile = false;
  constructor(
      private outilService: RobotTaskService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
  ) {}


  ngOnInit() {
    this.loadOutils();
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this));
    this.loadOutils();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 700;
  }
  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadOutils();
  }

  loadOutils() {
    this.loading = true;
    this.outilService.getAllOutils(this.page, this.size, this.search).subscribe({
      next: res => {
        this.outils = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
        this.loading = false;
      },
      error: err => {
        this.snackBar.open('Erreur lors du chargement', 'Fermer', { duration: 2500 });
        this.loading = false;
      }
    });
  }

  pageChanged(newPage: number) {
    this.page = newPage;
    this.loadOutils();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(OutilDialogComponent, {
      width: '450px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.outilService.createOutil(result).subscribe({
          next: () => {
            this.snackBar.open('✅ Outil ajoutée avec succès!', 'Fermer', {
              duration: 3500,
              panelClass: ['snackbar-success']
            });
            this.loadOutils();
          },
          error: (err) => {
            const msg = err.error?.message || err.error || '❌ Erreur lors de l\'ajout';
            this.snackBar.open(msg, 'Fermer', {
              duration: 4000,
              panelClass: ['snackbar-error']
            });
          }
        });
      }
    });
  }


  openEditDialog(outil: Outil) {
    const dialogRef = this.dialog.open(OutilDialogComponent, { width: '450px', data: { outil } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.outilService.updateOutil(outil.id!, result).subscribe({
          next: () => {
            this.snackBar.open('✏️ Outil modifiée avec succès!', 'Fermer', {
              duration: 3500,
              panelClass: ['snackbar-success']
            });
            this.loadOutils();
          },
          error: () => {
            this.snackBar.open('❌ Erreur lors de la modification', 'Fermer', {
              duration: 4000,
              panelClass: ['snackbar-error']
            });
          }
        });
      }
    });
  }

  deleteOutil(id: number) {
    if (confirm('Supprimer cet outil ?')) {
      this.outilService.deleteOutil(id).subscribe({
        next: () => {
          this.snackBar.open('🗑️ Outil supprimée avec succès!', 'Fermer', {
            duration: 3500,
            panelClass: ['snackbar-success']
          });
          this.loadOutils();
        },
        error: () => {
          this.snackBar.open('❌ Erreur lors de la suppression', 'Fermer', {
            duration: 4000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

  searchOutils() {
    this.page = 0;
    this.loadOutils();
  }

  openImagePreview(imageUrl: string) {
    this.dialog.open(ImagePreviewDialogComponent, {
      data: { imageUrl },
      panelClass: 'image-preview-dialog-panel',
      backdropClass: 'dark-backdrop'
    });
  }

  getQteBadgeClass(qte: number): string {
    if (qte <= 2) return 'qte-badge-low';
    if (qte <= 5) return 'qte-badge-medium';
    return 'qte-badge-ok';
  }

  openBadgeLegendDialog(): void {
    this.dialog.open(BadgeLegendDialogComponent, {
      panelClass: 'badge-legend-dialog-panel'
    });
  }

  exportExcel() {
    // Prépare les données à exporter
    const exportData = this.outils.map(outil => ({
      Référence: outil.reference,
      Désignation: outil.designation,
      specification: outil.specification,
      // Quantité: outil.quantite,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pièces');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'liste_pieces.xlsx');
  }
  exportPdf() {
    const doc = new jsPDF();

    doc.setFontSize(16);
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.text('Liste des pièces', pageWidth / 2, 15, { align: 'center' });

    const columns = ["Référence", "Désignation","Spécification", "Description"];
    const rows = this.outils.map(outil => [
      outil.reference,
      outil.designation,
      outil.specification,
      // outil.quantite,
      outil.description
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 22,
      styles: { fontSize: 11 }
    });

    doc.save('liste_outils.pdf');
  }

}
