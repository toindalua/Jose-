import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextareaModule } from 'primeng/textarea';
import { Toolbar } from './components/toolbar/toolbar';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { AsyncPipe, CommonModule } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';

interface Cliente {
  id?: number;
  nome: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    TextareaModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    TableModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('devWeb');

  clienteForm: FormGroup;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;

  clientes$!: Observable<any>;

  private apiUrlSave = 'http://localhost:8080/api/v1/clientes/salvar-cliente';
  private apiUrlList = 'http://localhost:8080/api/v1/clientes/listar'; // Ajuste se necessário

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.clientes$ = this.http.get<any>(this.apiUrlList).pipe(
      catchError((err) => {
        console.error('Erro ao buscar clientes:', err);
        return of([]); // mantém a tabela renderizável
      })
    );
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      this.http.post(this.apiUrlSave, this.clienteForm.value).subscribe({
        next: () => {
          this.mensagemSucesso = 'Cliente salvo com sucesso!';
          this.mensagemErro = null;
          this.clienteForm.reset();
          this.loadClientes();
        },
        error: () => {
          this.mensagemErro = 'Erro ao salvar cliente.';
          this.mensagemSucesso = null;
        }
      });
    }
  }
}
