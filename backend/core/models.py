from django.db import models

# Create your models here.

class Doador(models.Model):
    nome = models.CharField(max_length=100)
    telefone = models.CharField(max_length=15, blank=True, null=True, unique=True)
    is_membro = models.BooleanField(default=False)
    senha = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.nome
    
class Alimento(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    descricao = models.TextField(blank=True, null=True)
    quantidade_necessaria = models.PositiveIntegerField(default=0)
    quantidade_disponivel = models.PositiveIntegerField(default=0)
    tipo = models.CharField(max_length=20, default='outro')
    unidade = models.CharField(max_length=20, default='unidade')
    data_validade = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.nome
    
class Doacao(models.Model):
    doador = models.ForeignKey(Doador, on_delete=models.CASCADE)
    alimento = models.ForeignKey(Alimento, on_delete=models.CASCADE)
    data = models.DateField()
    quantidade = models.PositiveIntegerField()
    descricao = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'Doação de {self.quantidade} por {self.doador.nome} em {self.data}'
    
TIPO_CESTA = (
    ('Cesta Padrão', 'Cesta Padrão'),
    ('Cesta Família com mais crianças', 'Cesta Família com mais crianças'),
    ('Cesta Família em estado de miserabilidade', 'Cesta Família em estado de miserabilidade'),
    ('Cesta de Natal', 'Cesta de Natal'),
)

class Cesta(models.Model):
    tipo = models.CharField(max_length=100, choices=TIPO_CESTA)
    quantidade = models.PositiveIntegerField(default=0)

