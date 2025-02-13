<script setup>
import { ref, computed, onMounted } from "vue";

const ceps = ref([]);
const searchQuery = ref("");
const carregando = ref(false);
const erro = ref(null);
const ordem = ref("asc"); // Padrão: ordem crescente

// Função para buscar os CEPs da API
const fetchCeps = async () => {
    try {
        carregando.value = true;
        erro.value = null;
        const response = await fetch("http://localhost:5000/api/addresses"); // Ajuste a URL da API
        if (!response.ok) throw new Error("Erro ao buscar CEPs");

        const data = await response.json();
        ceps.value = data; // Removida a propriedade `hidden`
    } catch (error) {
        erro.value = error.message;
    } finally {
        carregando.value = false;
    }
};

// Filtra e ordena os CEPs conforme o usuário digita
const filteredCeps = computed(() => {
    let lista = ceps.value.filter((cep) =>
        cep.cep.startsWith(searchQuery.value.trim())
    );

    // Ordena conforme o estado da variável `ordem`
    return lista.sort((a, b) =>
        ordem.value === "asc" ? a.cep.localeCompare(b.cep) : b.cep.localeCompare(a.cep)
    );
});

// Chama a função ao montar o componente
onMounted(fetchCeps);
</script>

<template>
    <div class="container">
        <h2>Lista de CEPs</h2>

        <div class="search-container">
            <input
                v-model="searchQuery"
                placeholder="Digite o CEP..."
                @input="fetchCeps"
            />

            <button @click="fetchCeps" :disabled="carregando">
                {{ carregando ? "Atualizando..." : "Buscar CEPs" }}
            </button>

            <!-- Botão para alternar a ordem -->
            <button @click="ordem = ordem === 'asc' ? 'desc' : 'asc'">
                Ordenar: {{ ordem === 'asc' ? 'Crescente' : 'Decrescente' }}
            </button>
        </div>

        <p v-if="erro" class="erro">{{ erro }}</p>

        <table v-if="filteredCeps.length">
            <thead>
                <tr>
                    <th>CEP</th>
                    <th>Logradouro</th>
                    <th>Bairro</th>
                    <th>Cidade</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cep in filteredCeps" :key="cep.id">
                    <td>{{ cep.cep }}</td>
                    <td>{{ cep.logradouro }}</td>
                    <td>{{ cep.bairro }}</td>
                    <td>{{ cep.localidade }}</td>
                    <td>{{ cep.uf }}</td>
                </tr>
            </tbody>
        </table>

        <p v-else>Nenhum CEP encontrado.</p>
    </div>
</template>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    color: #333;
}

.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

input {
    padding: 8px;
    margin-right: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1;
}

button {
    padding: 8px 12px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    margin: 5px;
    transition: background-color 0.3s ease;
}

button:disabled {
    background-color: #5a9fd4;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background-color: #0056b3;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
    cursor: pointer;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

.erro {
    color: red;
    font-weight: bold;
    text-align: center;
}
</style>
