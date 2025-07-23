import { Component, OnInit } from '@angular/core';
import { Piece } from '../../../Models/piece.model';
import { MatDialog } from '@angular/material/dialog';
import { PieceDialogComponent } from '../piece-dialog/piece-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {RobotTaskService} from "../../../Services/robot-task.service";
import {PageEvent} from "@angular/material/paginator";
import { ImagePreviewDialogComponent } from '../../shared/image-preview-dialog/image-preview-dialog.component';
import {BadgeLegendDialogComponent} from "./badge-legend-dialog/badge-legend-dialog.component";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-piece-list',
  templateUrl: './piece-list.component.html',
  styleUrls: ['./piece-list.component.scss']
})
export class PieceListComponent implements OnInit {
  pieces: Piece[] = [];
  page = 0;
  size = 5;
  totalItems = 0;
  totalPages = 0;
  totalElements = 0;
  loading = false;
  search = '';
  isMobile = false;
  constructor(
      private pieceService: RobotTaskService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
  ) {}


  ngOnInit() {
    this.loadPieces();
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this));
    this.loadPieces();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 700;
  }
  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadPieces();
  }

  loadPieces() {
    this.loading = true;
    this.pieceService.getAll(this.page, this.size, this.search).subscribe({
      next: res => {
        this.pieces = res.content;
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
    this.loadPieces();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(PieceDialogComponent, {
      width: '450px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pieceService.createPiece(result).subscribe({
          next: () => {
            this.snackBar.open('✅ Pièce ajoutée avec succès!', 'Fermer', {
              duration: 3500,
              panelClass: ['snackbar-success']
            });
            this.loadPieces();
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


  openEditDialog(piece: Piece) {
    const dialogRef = this.dialog.open(PieceDialogComponent, { width: '450px', data: { piece } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pieceService.updatePiece(piece.id!, result).subscribe({
          next: () => {
            this.snackBar.open('✏️ Pièce modifiée avec succès!', 'Fermer', {
              duration: 3500,
              panelClass: ['snackbar-success']
            });
            this.loadPieces();
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

  deletePiece(id: number) {
    if (confirm('Supprimer cette pièce ?')) {
      this.pieceService.deletePiece(id).subscribe({
        next: () => {
          this.snackBar.open('🗑️ Pièce supprimée avec succès!', 'Fermer', {
            duration: 3500,
            panelClass: ['snackbar-success']
          });
          this.loadPieces();
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

  searchPieces() {
    this.page = 0;
    this.loadPieces();
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
    const exportData = this.pieces.map(piece => ({
      Référence: piece.reference,
      Désignation: piece.designation,
      Quantité: piece.quantite,
      Observation: piece.observation
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

    const columns = ["Référence", "Désignation", "Quantité", "Observation"];
    const rows = this.pieces.map(piece => [
      piece.reference,
      piece.designation,
      piece.quantite,
      piece.observation
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 22,
      styles: { fontSize: 11 }
    });

    doc.save('liste_pieces.pdf');
  }


}
