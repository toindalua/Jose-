package com.api.unipar.controller;

import com.api.unipar.entidades.Cliente;
import com.api.unipar.services.ClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/clientes")
public class ClientesController {
    private final ClienteService clienteService;

    public ClientesController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/listar")
    public List<Cliente> listarTodosClientes() {
        return clienteService.listarTodosClientes();
    }

    @PostMapping("/salvar-cliente")
    public Cliente salvarCliente(@RequestBody Cliente cliente) {
        return clienteService.salvarCliente(cliente);
    }

    @GetMapping("/buscar-cliente/{id}")
    public Cliente buscarClientePorId(@PathVariable Long id) {
        return clienteService.buscarClientePorId(id);
    }

    @DeleteMapping("/deletar-cliente/{id}")
    public void deletarClientePorId(@PathVariable Long id) {
        clienteService.deletarClientePorId(id);
    }

    @PutMapping("/atualizar-cliente/{id}")
    public Cliente atualizarClientePorId(@PathVariable Long id, @RequestBody Cliente cliente) {
        return clienteService.atualizarCliente(id, cliente);
    }
    
}
