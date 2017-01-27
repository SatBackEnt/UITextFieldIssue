
List<String> words = Arrays.asList("head", "now"); // suppose these words are offensive

for (String word : words) {
     Pattern rx = Pattern.compile("\\b" + word + "\\b", Pattern.CASE_INSENSITIVE);
     s = rx.matcher(s).replaceAll(new String(new char[word.length()]).replace('\0', '*'));
}