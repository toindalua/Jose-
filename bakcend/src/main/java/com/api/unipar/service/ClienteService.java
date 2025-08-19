package com.api.unipar.service;

import com.api.unipar.entidades.Cliente;
import com.api.unipar.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listarTodosCLientes() {
        return clienteRepository.findAll();
    }
}
